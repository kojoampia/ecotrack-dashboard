package com.ecotrack.app.service.impl;

import com.ecotrack.app.service.CompliancePayloadService;
import com.ecotrack.app.service.dto.CompliancePayloadDTO;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.Year;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for CBAM compliance payload generation and management.
 * Uses external bash script to generate TARIC-compliant payloads.
 */
@Service
@Transactional
public class CompliancePayloadServiceImpl implements CompliancePayloadService {

    private static final Logger log = LoggerFactory.getLogger(CompliancePayloadServiceImpl.class);

    @Value("${ecotrack.scripts.path:scripts}")
    private String scriptsPath;

    @Value("${ecotrack.compliance.output.path:target/compliance-reports}")
    private String outputPath;

    // In-memory storage for demo purposes - in production, use database
    private final Map<Long, CompliancePayloadDTO> payloadStore = new ConcurrentHashMap<>();
    private long nextId = 1L;

    @Override
    public CompliancePayloadDTO generatePayload(String tenantId, Year year, String jwtToken, String outputFormat) {
        log.debug("Generating compliance payload for tenant: {}, year: {}, format: {}", tenantId, year, outputFormat);

        CompliancePayloadDTO payload = new CompliancePayloadDTO();
        payload.setId(nextId++);
        payload.setTenantId(tenantId);
        payload.setReportingYear(year);
        payload.setOutputFormat(outputFormat);
        payload.setGeneratedAt(Instant.now());
        payload.setStatus("GENERATING");

        try {
            // Execute the bash script
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command(
                Paths.get(scriptsPath, "generate-compliance-payload.sh").toString(),
                tenantId,
                String.valueOf(year.getValue()),
                jwtToken,
                outputFormat
            );

            // Set working directory to project root
            processBuilder.directory(new File(System.getProperty("user.dir")));
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Parse output to get file information
                String output = new String(process.getInputStream().readAllBytes());
                log.debug("Script output: {}", output);

                // Extract file path from output (simplified parsing)
                String filePath = extractFilePathFromOutput(output);
                if (filePath != null) {
                    File generatedFile = new File(filePath);
                    if (generatedFile.exists()) {
                        payload.setFilePath(filePath);
                        payload.setFileName(generatedFile.getName());
                        payload.setFileSize(generatedFile.length());
                        payload.setChecksum(calculateChecksum(generatedFile));
                        payload.setStatus("GENERATED");

                        log.info("Successfully generated compliance payload: {}", filePath);
                    } else {
                        payload.setStatus("ERROR");
                        payload.setErrorMessage("Generated file not found: " + filePath);
                    }
                } else {
                    payload.setStatus("ERROR");
                    payload.setErrorMessage("Could not determine output file path");
                }
            } else {
                String errorOutput = new String(process.getInputStream().readAllBytes());
                payload.setStatus("ERROR");
                payload.setErrorMessage("Script execution failed: " + errorOutput);
                log.error("Compliance payload generation failed for tenant: {}, error: {}", tenantId, errorOutput);
            }
        } catch (IOException | InterruptedException e) {
            payload.setStatus("ERROR");
            payload.setErrorMessage("Exception during payload generation: " + e.getMessage());
            log.error("Exception generating compliance payload for tenant: {}", tenantId, e);
        }

        payloadStore.put(payload.getId(), payload);
        return payload;
    }

    @Override
    public Optional<CompliancePayloadDTO> findById(Long id) {
        return Optional.ofNullable(payloadStore.get(id));
    }

    @Override
    public Page<CompliancePayloadDTO> findByTenantId(String tenantId, Pageable pageable) {
        List<CompliancePayloadDTO> payloads = payloadStore
            .values()
            .stream()
            .filter(p -> tenantId.equals(p.getTenantId()))
            .sorted(Comparator.comparing(CompliancePayloadDTO::getGeneratedAt).reversed())
            .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), payloads.size());
        List<CompliancePayloadDTO> pageContent = payloads.subList(start, Math.min(end, payloads.size()));

        return new PageImpl<>(pageContent, pageable, payloads.size());
    }

    @Override
    public Page<CompliancePayloadDTO> findByTenantIdAndYear(String tenantId, Year year, Pageable pageable) {
        List<CompliancePayloadDTO> payloads = payloadStore
            .values()
            .stream()
            .filter(p -> tenantId.equals(p.getTenantId()) && year.equals(p.getReportingYear()))
            .sorted(Comparator.comparing(CompliancePayloadDTO::getGeneratedAt).reversed())
            .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), payloads.size());
        List<CompliancePayloadDTO> pageContent = payloads.subList(start, Math.min(end, payloads.size()));

        return new PageImpl<>(pageContent, pageable, payloads.size());
    }

    @Override
    public void deleteById(Long id) {
        CompliancePayloadDTO payload = payloadStore.get(id);
        if (payload != null) {
            // Delete the physical file if it exists
            if (payload.getFilePath() != null) {
                try {
                    Files.deleteIfExists(Paths.get(payload.getFilePath()));
                } catch (IOException e) {
                    log.warn("Could not delete file: {}", payload.getFilePath(), e);
                }
            }
            payloadStore.remove(id);
            log.info("Deleted compliance payload: {}", id);
        }
    }

    @Override
    public ComplianceValidationResult validatePayload(CompliancePayloadDTO payload) {
        if (payload == null) {
            return new ComplianceValidationResult(false, "Payload is null");
        }

        if (payload.getTenantId() == null || payload.getTenantId().trim().isEmpty()) {
            return new ComplianceValidationResult(false, "Tenant ID is required");
        }

        if (payload.getReportingYear() == null) {
            return new ComplianceValidationResult(false, "Reporting year is required");
        }

        if (payload.getFilePath() == null || !Files.exists(Paths.get(payload.getFilePath()))) {
            return new ComplianceValidationResult(false, "Payload file does not exist");
        }

        // Additional TARIC-specific validations could be added here
        // For example: check XML/JSON structure, required fields, etc.

        return new ComplianceValidationResult(true, null);
    }

    private String extractFilePathFromOutput(String output) {
        // Simple parsing - look for "File: " in the output
        for (String line : output.split("\n")) {
            if (line.startsWith("File: ")) {
                return line.substring(6).trim();
            }
        }
        return null;
    }

    private String calculateChecksum(File file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(Files.readAllBytes(file.toPath()));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException | IOException e) {
            log.warn("Could not calculate checksum for file: {}", file.getPath(), e);
            return null;
        }
    }
}

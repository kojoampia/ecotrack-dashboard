package com.ecotrack.app.web.rest;

import com.ecotrack.app.service.CompliancePayloadService;
import com.ecotrack.app.service.dto.CompliancePayloadDTO;
import com.ecotrack.app.web.rest.errors.BadRequestAlertException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing CBAM compliance payloads.
 * Provides endpoints for generating, retrieving, and managing
 * automated compliance reports for EU TARIC system.
 */
@RestController
@RequestMapping("/api/compliance-payload")
@Tag(name = "compliance-payload", description = "CBAM Compliance Payload API")
public class CompliancePayloadResource {

    private static final Logger log = LoggerFactory.getLogger(CompliancePayloadResource.class);

    private static final String ENTITY_NAME = "compliancePayload";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompliancePayloadService compliancePayloadService;

    public CompliancePayloadResource(CompliancePayloadService compliancePayloadService) {
        this.compliancePayloadService = compliancePayloadService;
    }

    /**
     * {@code POST  /compliance-payload/generate} : Generate a new compliance payload.
     *
     * @param tenantId the tenant identifier
     * @param year the reporting year
     * @param outputFormat the output format (json or xml)
     * @param jwtToken the JWT token for authentication (from Authorization header)
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new compliancePayloadDTO,
     * or with status {@code 400 (Bad Request)} if the payload generation failed.
     */
    @PostMapping("/generate")
    @Operation(
        summary = "Generate CBAM compliance payload",
        description = "Generates a new compliance payload for EU TARIC system submission"
    )
    @ApiResponse(responseCode = "201", description = "Compliance payload generated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input or generation failed")
    public ResponseEntity<CompliancePayloadDTO> generatePayload(
        @Parameter(description = "Tenant identifier") @RequestParam @NotNull String tenantId,
        @Parameter(description = "Reporting year") @RequestParam @NotNull Integer year,
        @Parameter(description = "Output format (json or xml)") @RequestParam(defaultValue = "json") String outputFormat,
        @Parameter(description = "JWT token for authentication") @RequestHeader("Authorization") String authorizationHeader
    ) {
        log.debug("REST request to generate compliance payload for tenant: {}, year: {}", tenantId, year);

        // Extract JWT token from Authorization header
        String jwtToken = extractJwtToken(authorizationHeader);
        if (jwtToken == null) {
            throw new BadRequestAlertException("Invalid or missing Authorization header", ENTITY_NAME, "invalidAuth");
        }

        try {
            Year reportingYear = Year.of(year);
            CompliancePayloadDTO result = compliancePayloadService.generatePayload(tenantId, reportingYear, jwtToken, outputFormat);

            if ("ERROR".equals(result.getStatus())) {
                throw new BadRequestAlertException(
                    "Payload generation failed: " + result.getErrorMessage(),
                    ENTITY_NAME,
                    "generationFailed"
                );
            }

            return ResponseEntity
                .created(new URI("/api/compliance-payload/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
        } catch (URISyntaxException e) {
            throw new BadRequestAlertException("Invalid URI for created resource", ENTITY_NAME, "uriSyntaxError");
        }
    }

    /**
     * {@code GET  /compliance-payload} : Get all compliance payloads for the current tenant.
     *
     * @param pageable the pagination information.
     * @param tenantId optional tenant filter (defaults to current tenant)
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of compliance payloads in body.
     */
    @GetMapping
    @Operation(summary = "Get compliance payloads", description = "Retrieve paginated list of compliance payloads")
    public ResponseEntity<List<CompliancePayloadDTO>> getAllCompliancePayloads(
        @Parameter(description = "Pagination information") Pageable pageable,
        @Parameter(description = "Tenant identifier filter") @RequestParam(required = false) String tenantId
    ) {
        log.debug("REST request to get compliance payloads for tenant: {}", tenantId);

        Page<CompliancePayloadDTO> page = compliancePayloadService.findByTenantId(tenantId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /compliance-payload/year/{year}} : Get compliance payloads for a specific year.
     *
     * @param year the reporting year
     * @param pageable the pagination information
     * @param tenantId optional tenant filter
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of compliance payloads in body.
     */
    @GetMapping("/year/{year}")
    @Operation(summary = "Get compliance payloads by year", description = "Retrieve compliance payloads for a specific reporting year")
    public ResponseEntity<List<CompliancePayloadDTO>> getCompliancePayloadsByYear(
        @Parameter(description = "Reporting year") @PathVariable Integer year,
        @Parameter(description = "Pagination information") Pageable pageable,
        @Parameter(description = "Tenant identifier filter") @RequestParam(required = false) String tenantId
    ) {
        log.debug("REST request to get compliance payloads for year: {} and tenant: {}", year, tenantId);

        Year reportingYear = Year.of(year);
        Page<CompliancePayloadDTO> page = compliancePayloadService.findByTenantIdAndYear(tenantId, reportingYear, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /compliance-payload/{id}} : Get compliance payload by ID.
     *
     * @param id the ID of the compliance payload to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the compliancePayloadDTO,
     * or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get compliance payload by ID", description = "Retrieve a specific compliance payload")
    public ResponseEntity<CompliancePayloadDTO> getCompliancePayload(
        @Parameter(description = "Compliance payload ID") @PathVariable Long id
    ) {
        log.debug("REST request to get CompliancePayload : {}", id);
        Optional<CompliancePayloadDTO> compliancePayloadDTO = compliancePayloadService.findById(id);
        return ResponseUtil.wrapOrNotFound(compliancePayloadDTO);
    }

    /**
     * {@code DELETE  /compliance-payload/{id}} : Delete compliance payload by ID.
     *
     * @param id the ID of the compliance payload to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete compliance payload", description = "Delete a compliance payload and its associated file")
    @ApiResponse(responseCode = "204", description = "Compliance payload deleted")
    @ApiResponse(responseCode = "404", description = "Compliance payload not found")
    public ResponseEntity<Void> deleteCompliancePayload(@Parameter(description = "Compliance payload ID") @PathVariable Long id) {
        log.debug("REST request to delete CompliancePayload : {}", id);
        compliancePayloadService.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code POST  /compliance-payload/{id}/validate} : Validate a compliance payload.
     *
     * @param id the ID of the compliance payload to validate.
     * @return the {@link ResponseEntity} with validation result.
     */
    @PostMapping("/{id}/validate")
    @Operation(summary = "Validate compliance payload", description = "Validate a compliance payload for TARIC system requirements")
    public ResponseEntity<ComplianceValidationResponse> validateCompliancePayload(
        @Parameter(description = "Compliance payload ID") @PathVariable Long id
    ) {
        log.debug("REST request to validate CompliancePayload : {}", id);

        Optional<CompliancePayloadDTO> payloadOpt = compliancePayloadService.findById(id);
        if (payloadOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CompliancePayloadService.ComplianceValidationResult validationResult = compliancePayloadService.validatePayload(payloadOpt.get());

        ComplianceValidationResponse response = new ComplianceValidationResponse(
            validationResult.isValid(),
            validationResult.getErrorMessage()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * {@code GET  /compliance-payload/:id/download} : download the CBAM XML payload for the "id" compliance payload.
     *
     * @param id the id of the compliance payload to download.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the XML as byte array.
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadPayload(@PathVariable("id") Long id) {
        log.debug("REST request to download CBAM payload for CompliancePayload : {}", id);

        Optional<CompliancePayloadDTO> payloadOpt = compliancePayloadService.findById(id);
        if (payloadOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CompliancePayloadDTO payload = payloadOpt.get();
        if (payload.getFilePath() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            java.nio.file.Path filePath = java.nio.file.Paths.get(payload.getFilePath());
            byte[] fileContent = java.nio.file.Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_XML);
            headers.setContentDispositionFormData("attachment", payload.getFileName());
            headers.setContentLength(fileContent.length);

            return ResponseEntity.ok().headers(headers).body(fileContent);
        } catch (java.io.IOException e) {
            log.error("Error reading payload file", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private String extractJwtToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    /**
     * Response DTO for validation results.
     */
    public static class ComplianceValidationResponse {

        private final boolean valid;
        private final String errorMessage;

        public ComplianceValidationResponse(boolean valid, String errorMessage) {
            this.valid = valid;
            this.errorMessage = errorMessage;
        }

        public boolean isValid() {
            return valid;
        }

        public String getErrorMessage() {
            return errorMessage;
        }
    }
}

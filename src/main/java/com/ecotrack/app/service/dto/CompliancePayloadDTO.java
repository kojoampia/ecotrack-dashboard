package com.ecotrack.app.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.time.Year;
import java.util.Objects;

/**
 * DTO for CBAM compliance payload data.
 * Represents a generated compliance report for EU TARIC system submission.
 */
public class CompliancePayloadDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String tenantId;
    private Year reportingYear;
    private String outputFormat; // "json" or "xml"
    private String filePath;
    private String fileName;
    private Long fileSize; // in bytes
    private Instant generatedAt;
    private String status; // "GENERATED", "VALIDATED", "SUBMITTED", "ERROR"
    private String errorMessage;
    private String checksum; // for integrity verification

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public Year getReportingYear() {
        return reportingYear;
    }

    public void setReportingYear(Year reportingYear) {
        this.reportingYear = reportingYear;
    }

    public String getOutputFormat() {
        return outputFormat;
    }

    public void setOutputFormat(String outputFormat) {
        this.outputFormat = outputFormat;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Instant getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(Instant generatedAt) {
        this.generatedAt = generatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompliancePayloadDTO)) {
            return false;
        }
        CompliancePayloadDTO that = (CompliancePayloadDTO) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return (
            "CompliancePayloadDTO{" +
            "id=" +
            getId() +
            ", tenantId='" +
            getTenantId() +
            "'" +
            ", reportingYear=" +
            getReportingYear() +
            ", outputFormat='" +
            getOutputFormat() +
            "'" +
            ", fileName='" +
            getFileName() +
            "'" +
            ", fileSize=" +
            getFileSize() +
            ", generatedAt='" +
            getGeneratedAt() +
            "'" +
            ", status='" +
            getStatus() +
            "'" +
            "}"
        );
    }
}

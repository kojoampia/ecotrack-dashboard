package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.ComplianceStatus;
import com.ecotrack.app.domain.enumeration.ReportType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecotrack.app.domain.ComplianceReport} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ComplianceReportDTO implements Serializable {

    private Long id;

    private ReportType reportType;

    private Instant reportPeriodStart;

    private Instant reportPeriodEnd;

    private BigDecimal totalEmissions;

    private BigDecimal scope1Emissions;

    private BigDecimal scope2Emissions;

    private BigDecimal scope3Emissions;

    private BigDecimal complianceThreshold;

    private BigDecimal complianceScore;

    private ComplianceStatus status;

    private Instant submittedAt;

    private Instant approvedAt;

    private Instant rejectedAt;

    private String rejectionReason;

    private String regulatoryReference;

    private Boolean payloadGenerated;

    private String payloadPath;

    private String checksum;

    private String tenantId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public Instant getReportPeriodStart() {
        return reportPeriodStart;
    }

    public void setReportPeriodStart(Instant reportPeriodStart) {
        this.reportPeriodStart = reportPeriodStart;
    }

    public Instant getReportPeriodEnd() {
        return reportPeriodEnd;
    }

    public void setReportPeriodEnd(Instant reportPeriodEnd) {
        this.reportPeriodEnd = reportPeriodEnd;
    }

    public BigDecimal getTotalEmissions() {
        return totalEmissions;
    }

    public void setTotalEmissions(BigDecimal totalEmissions) {
        this.totalEmissions = totalEmissions;
    }

    public BigDecimal getScope1Emissions() {
        return scope1Emissions;
    }

    public void setScope1Emissions(BigDecimal scope1Emissions) {
        this.scope1Emissions = scope1Emissions;
    }

    public BigDecimal getScope2Emissions() {
        return scope2Emissions;
    }

    public void setScope2Emissions(BigDecimal scope2Emissions) {
        this.scope2Emissions = scope2Emissions;
    }

    public BigDecimal getScope3Emissions() {
        return scope3Emissions;
    }

    public void setScope3Emissions(BigDecimal scope3Emissions) {
        this.scope3Emissions = scope3Emissions;
    }

    public BigDecimal getComplianceThreshold() {
        return complianceThreshold;
    }

    public void setComplianceThreshold(BigDecimal complianceThreshold) {
        this.complianceThreshold = complianceThreshold;
    }

    public BigDecimal getComplianceScore() {
        return complianceScore;
    }

    public void setComplianceScore(BigDecimal complianceScore) {
        this.complianceScore = complianceScore;
    }

    public ComplianceStatus getStatus() {
        return status;
    }

    public void setStatus(ComplianceStatus status) {
        this.status = status;
    }

    public Instant getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Instant submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Instant getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Instant approvedAt) {
        this.approvedAt = approvedAt;
    }

    public Instant getRejectedAt() {
        return rejectedAt;
    }

    public void setRejectedAt(Instant rejectedAt) {
        this.rejectedAt = rejectedAt;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getRegulatoryReference() {
        return regulatoryReference;
    }

    public void setRegulatoryReference(String regulatoryReference) {
        this.regulatoryReference = regulatoryReference;
    }

    public Boolean getPayloadGenerated() {
        return payloadGenerated;
    }

    public void setPayloadGenerated(Boolean payloadGenerated) {
        this.payloadGenerated = payloadGenerated;
    }

    public String getPayloadPath() {
        return payloadPath;
    }

    public void setPayloadPath(String payloadPath) {
        this.payloadPath = payloadPath;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComplianceReportDTO)) {
            return false;
        }

        ComplianceReportDTO complianceReportDTO = (ComplianceReportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, complianceReportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComplianceReportDTO{" +
            "id=" + getId() +
            ", reportType='" + getReportType() + "'" +
            ", reportPeriodStart='" + getReportPeriodStart() + "'" +
            ", reportPeriodEnd='" + getReportPeriodEnd() + "'" +
            ", totalEmissions=" + getTotalEmissions() +
            ", scope1Emissions=" + getScope1Emissions() +
            ", scope2Emissions=" + getScope2Emissions() +
            ", scope3Emissions=" + getScope3Emissions() +
            ", complianceThreshold=" + getComplianceThreshold() +
            ", complianceScore=" + getComplianceScore() +
            ", status='" + getStatus() + "'" +
            ", submittedAt='" + getSubmittedAt() + "'" +
            ", approvedAt='" + getApprovedAt() + "'" +
            ", rejectedAt='" + getRejectedAt() + "'" +
            ", rejectionReason='" + getRejectionReason() + "'" +
            ", regulatoryReference='" + getRegulatoryReference() + "'" +
            ", payloadGenerated='" + getPayloadGenerated() + "'" +
            ", payloadPath='" + getPayloadPath() + "'" +
            ", checksum='" + getChecksum() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

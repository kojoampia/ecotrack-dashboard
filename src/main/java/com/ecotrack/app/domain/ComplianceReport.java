package com.ecotrack.app.domain;

import com.ecotrack.app.domain.enumeration.ComplianceStatus;
import com.ecotrack.app.domain.enumeration.ReportType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ComplianceReport.
 */
@Entity
@Table(name = "compliance_report")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ComplianceReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false)
    private ReportType reportType;

    @Column(name = "report_period_start")
    private Instant reportPeriodStart;

    @Column(name = "report_period_end")
    private Instant reportPeriodEnd;

    @Column(name = "total_emissions")
    private BigDecimal totalEmissions;

    @Column(name = "scope_1_emissions")
    private BigDecimal scope1Emissions;

    @Column(name = "scope_2_emissions")
    private BigDecimal scope2Emissions;

    @Column(name = "scope_3_emissions")
    private BigDecimal scope3Emissions;

    @Column(name = "compliance_threshold")
    private BigDecimal complianceThreshold;

    @Column(name = "compliance_score")
    private BigDecimal complianceScore;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ComplianceStatus status;

    @Column(name = "submitted_at")
    private Instant submittedAt;

    @Column(name = "approved_at")
    private Instant approvedAt;

    @Column(name = "rejected_at")
    private Instant rejectedAt;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "regulatory_reference")
    private String regulatoryReference;

    @Column(name = "payload_generated")
    private Boolean payloadGenerated;

    @Column(name = "payload_path")
    private String payloadPath;

    @Column(name = "checksum")
    private String checksum;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ComplianceReport id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReportType getReportType() {
        return this.reportType;
    }

    public ComplianceReport reportType(ReportType reportType) {
        this.setReportType(reportType);
        return this;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public Instant getReportPeriodStart() {
        return this.reportPeriodStart;
    }

    public ComplianceReport reportPeriodStart(Instant reportPeriodStart) {
        this.setReportPeriodStart(reportPeriodStart);
        return this;
    }

    public void setReportPeriodStart(Instant reportPeriodStart) {
        this.reportPeriodStart = reportPeriodStart;
    }

    public Instant getReportPeriodEnd() {
        return this.reportPeriodEnd;
    }

    public ComplianceReport reportPeriodEnd(Instant reportPeriodEnd) {
        this.setReportPeriodEnd(reportPeriodEnd);
        return this;
    }

    public void setReportPeriodEnd(Instant reportPeriodEnd) {
        this.reportPeriodEnd = reportPeriodEnd;
    }

    public BigDecimal getTotalEmissions() {
        return this.totalEmissions;
    }

    public ComplianceReport totalEmissions(BigDecimal totalEmissions) {
        this.setTotalEmissions(totalEmissions);
        return this;
    }

    public void setTotalEmissions(BigDecimal totalEmissions) {
        this.totalEmissions = totalEmissions;
    }

    public BigDecimal getScope1Emissions() {
        return this.scope1Emissions;
    }

    public ComplianceReport scope1Emissions(BigDecimal scope1Emissions) {
        this.setScope1Emissions(scope1Emissions);
        return this;
    }

    public void setScope1Emissions(BigDecimal scope1Emissions) {
        this.scope1Emissions = scope1Emissions;
    }

    public BigDecimal getScope2Emissions() {
        return this.scope2Emissions;
    }

    public ComplianceReport scope2Emissions(BigDecimal scope2Emissions) {
        this.setScope2Emissions(scope2Emissions);
        return this;
    }

    public void setScope2Emissions(BigDecimal scope2Emissions) {
        this.scope2Emissions = scope2Emissions;
    }

    public BigDecimal getScope3Emissions() {
        return this.scope3Emissions;
    }

    public ComplianceReport scope3Emissions(BigDecimal scope3Emissions) {
        this.setScope3Emissions(scope3Emissions);
        return this;
    }

    public void setScope3Emissions(BigDecimal scope3Emissions) {
        this.scope3Emissions = scope3Emissions;
    }

    public BigDecimal getComplianceThreshold() {
        return this.complianceThreshold;
    }

    public ComplianceReport complianceThreshold(BigDecimal complianceThreshold) {
        this.setComplianceThreshold(complianceThreshold);
        return this;
    }

    public void setComplianceThreshold(BigDecimal complianceThreshold) {
        this.complianceThreshold = complianceThreshold;
    }

    public BigDecimal getComplianceScore() {
        return this.complianceScore;
    }

    public ComplianceReport complianceScore(BigDecimal complianceScore) {
        this.setComplianceScore(complianceScore);
        return this;
    }

    public void setComplianceScore(BigDecimal complianceScore) {
        this.complianceScore = complianceScore;
    }

    public ComplianceStatus getStatus() {
        return this.status;
    }

    public ComplianceReport status(ComplianceStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(ComplianceStatus status) {
        this.status = status;
    }

    public Instant getSubmittedAt() {
        return this.submittedAt;
    }

    public ComplianceReport submittedAt(Instant submittedAt) {
        this.setSubmittedAt(submittedAt);
        return this;
    }

    public void setSubmittedAt(Instant submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Instant getApprovedAt() {
        return this.approvedAt;
    }

    public ComplianceReport approvedAt(Instant approvedAt) {
        this.setApprovedAt(approvedAt);
        return this;
    }

    public void setApprovedAt(Instant approvedAt) {
        this.approvedAt = approvedAt;
    }

    public Instant getRejectedAt() {
        return this.rejectedAt;
    }

    public ComplianceReport rejectedAt(Instant rejectedAt) {
        this.setRejectedAt(rejectedAt);
        return this;
    }

    public void setRejectedAt(Instant rejectedAt) {
        this.rejectedAt = rejectedAt;
    }

    public String getRejectionReason() {
        return this.rejectionReason;
    }

    public ComplianceReport rejectionReason(String rejectionReason) {
        this.setRejectionReason(rejectionReason);
        return this;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getRegulatoryReference() {
        return this.regulatoryReference;
    }

    public ComplianceReport regulatoryReference(String regulatoryReference) {
        this.setRegulatoryReference(regulatoryReference);
        return this;
    }

    public void setRegulatoryReference(String regulatoryReference) {
        this.regulatoryReference = regulatoryReference;
    }

    public Boolean getPayloadGenerated() {
        return this.payloadGenerated;
    }

    public ComplianceReport payloadGenerated(Boolean payloadGenerated) {
        this.setPayloadGenerated(payloadGenerated);
        return this;
    }

    public void setPayloadGenerated(Boolean payloadGenerated) {
        this.payloadGenerated = payloadGenerated;
    }

    public String getPayloadPath() {
        return this.payloadPath;
    }

    public ComplianceReport payloadPath(String payloadPath) {
        this.setPayloadPath(payloadPath);
        return this;
    }

    public void setPayloadPath(String payloadPath) {
        this.payloadPath = payloadPath;
    }

    public String getChecksum() {
        return this.checksum;
    }

    public ComplianceReport checksum(String checksum) {
        this.setChecksum(checksum);
        return this;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public ComplianceReport tenantId(String tenantId) {
        this.setTenantId(tenantId);
        return this;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComplianceReport)) {
            return false;
        }
        return getId() != null && getId().equals(((ComplianceReport) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComplianceReport{" +
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

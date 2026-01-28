package com.ecotrack.app.domain;

import com.ecotrack.app.domain.enumeration.EvidenceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmissionEvidence.
 */
@Entity
@Table(name = "emission_evidence")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmissionEvidence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "evidence_type", nullable = false)
    private EvidenceType evidenceType;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "checksum")
    private String checksum;

    @Column(name = "uploaded_at")
    private Instant uploadedAt;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "verification_notes")
    private String verificationNotes;

    @Column(name = "retention_period")
    private Integer retentionPeriod;

    @Column(name = "legal_reference")
    private String legalReference;

    @ManyToOne(fetch = FetchType.LAZY)
    private EmissionRecord emissionRecord;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EmissionEvidence id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EvidenceType getEvidenceType() {
        return this.evidenceType;
    }

    public EmissionEvidence evidenceType(EvidenceType evidenceType) {
        this.setEvidenceType(evidenceType);
        return this;
    }

    public void setEvidenceType(EvidenceType evidenceType) {
        this.evidenceType = evidenceType;
    }

    public String getFileName() {
        return this.fileName;
    }

    public EmissionEvidence fileName(String fileName) {
        this.setFileName(fileName);
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return this.filePath;
    }

    public EmissionEvidence filePath(String filePath) {
        this.setFilePath(filePath);
        return this;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Long getFileSize() {
        return this.fileSize;
    }

    public EmissionEvidence fileSize(Long fileSize) {
        this.setFileSize(fileSize);
        return this;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getMimeType() {
        return this.mimeType;
    }

    public EmissionEvidence mimeType(String mimeType) {
        this.setMimeType(mimeType);
        return this;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getChecksum() {
        return this.checksum;
    }

    public EmissionEvidence checksum(String checksum) {
        this.setChecksum(checksum);
        return this;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public Instant getUploadedAt() {
        return this.uploadedAt;
    }

    public EmissionEvidence uploadedAt(Instant uploadedAt) {
        this.setUploadedAt(uploadedAt);
        return this;
    }

    public void setUploadedAt(Instant uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Boolean getVerified() {
        return this.verified;
    }

    public EmissionEvidence verified(Boolean verified) {
        this.setVerified(verified);
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public String getVerificationNotes() {
        return this.verificationNotes;
    }

    public EmissionEvidence verificationNotes(String verificationNotes) {
        this.setVerificationNotes(verificationNotes);
        return this;
    }

    public void setVerificationNotes(String verificationNotes) {
        this.verificationNotes = verificationNotes;
    }

    public Integer getRetentionPeriod() {
        return this.retentionPeriod;
    }

    public EmissionEvidence retentionPeriod(Integer retentionPeriod) {
        this.setRetentionPeriod(retentionPeriod);
        return this;
    }

    public void setRetentionPeriod(Integer retentionPeriod) {
        this.retentionPeriod = retentionPeriod;
    }

    public String getLegalReference() {
        return this.legalReference;
    }

    public EmissionEvidence legalReference(String legalReference) {
        this.setLegalReference(legalReference);
        return this;
    }

    public void setLegalReference(String legalReference) {
        this.legalReference = legalReference;
    }

    public EmissionRecord getEmissionRecord() {
        return this.emissionRecord;
    }

    public EmissionEvidence emissionRecord(EmissionRecord emissionRecord) {
        this.setEmissionRecord(emissionRecord);
        return this;
    }

    public void setEmissionRecord(EmissionRecord emissionRecord) {
        this.emissionRecord = emissionRecord;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public EmissionEvidence tenantId(String tenantId) {
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
        if (!(o instanceof EmissionEvidence)) {
            return false;
        }
        return getId() != null && getId().equals(((EmissionEvidence) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmissionEvidence{" +
            "id=" + getId() +
            ", evidenceType='" + getEvidenceType() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", filePath='" + getFilePath() + "'" +
            ", fileSize=" + getFileSize() +
            ", mimeType='" + getMimeType() + "'" +
            ", checksum='" + getChecksum() + "'" +
            ", uploadedAt='" + getUploadedAt() + "'" +
            ", verified='" + getVerified() + "'" +
            ", verificationNotes='" + getVerificationNotes() + "'" +
            ", retentionPeriod=" + getRetentionPeriod() +
            ", legalReference='" + getLegalReference() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

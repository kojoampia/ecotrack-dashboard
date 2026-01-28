package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.EvidenceType;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecotrack.app.domain.EmissionEvidence} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmissionEvidenceDTO implements Serializable {

    private Long id;

    private EvidenceType evidenceType;

    private String fileName;

    private String filePath;

    private Long fileSize;

    private String mimeType;

    private String checksum;

    private Instant uploadedAt;

    private Boolean verified;

    private String verificationNotes;

    private Integer retentionPeriod;

    private String legalReference;

    private String tenantId;

    private Long emissionRecordId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EvidenceType getEvidenceType() {
        return evidenceType;
    }

    public void setEvidenceType(EvidenceType evidenceType) {
        this.evidenceType = evidenceType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public Instant getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Instant uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public String getVerificationNotes() {
        return verificationNotes;
    }

    public void setVerificationNotes(String verificationNotes) {
        this.verificationNotes = verificationNotes;
    }

    public Integer getRetentionPeriod() {
        return retentionPeriod;
    }

    public void setRetentionPeriod(Integer retentionPeriod) {
        this.retentionPeriod = retentionPeriod;
    }

    public String getLegalReference() {
        return legalReference;
    }

    public void setLegalReference(String legalReference) {
        this.legalReference = legalReference;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public Long getEmissionRecordId() {
        return emissionRecordId;
    }

    public void setEmissionRecordId(Long emissionRecordId) {
        this.emissionRecordId = emissionRecordId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmissionEvidenceDTO)) {
            return false;
        }

        EmissionEvidenceDTO emissionEvidenceDTO = (EmissionEvidenceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, emissionEvidenceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmissionEvidenceDTO{" +
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
            ", emissionRecordId=" + getEmissionRecordId() +
            "}";
    }
}

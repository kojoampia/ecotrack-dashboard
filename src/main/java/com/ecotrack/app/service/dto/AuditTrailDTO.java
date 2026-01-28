package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.AuditAction;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecotrack.app.domain.AuditTrail} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AuditTrailDTO implements Serializable {

    private Long id;

    private AuditAction action;

    private String entityType;

    private String entityId;

    private String oldValues;

    private String newValues;

    private String changeReason;

    private String ipAddress;

    private String userAgent;

    private Instant timestamp;

    private String userId;

    private String userName;

    private String tenantId;

    private Long relatedEmissionRecordId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuditAction getAction() {
        return action;
    }

    public void setAction(AuditAction action) {
        this.action = action;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getOldValues() {
        return oldValues;
    }

    public void setOldValues(String oldValues) {
        this.oldValues = oldValues;
    }

    public String getNewValues() {
        return newValues;
    }

    public void setNewValues(String newValues) {
        this.newValues = newValues;
    }

    public String getChangeReason() {
        return changeReason;
    }

    public void setChangeReason(String changeReason) {
        this.changeReason = changeReason;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public Long getRelatedEmissionRecordId() {
        return relatedEmissionRecordId;
    }

    public void setRelatedEmissionRecordId(Long emissionRecordId) {
        this.relatedEmissionRecordId = emissionRecordId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuditTrailDTO)) {
            return false;
        }

        AuditTrailDTO auditTrailDTO = (AuditTrailDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, auditTrailDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuditTrailDTO{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", entityType='" + getEntityType() + "'" +
            ", entityId='" + getEntityId() + "'" +
            ", oldValues='" + getOldValues() + "'" +
            ", newValues='" + getNewValues() + "'" +
            ", changeReason='" + getChangeReason() + "'" +
            ", ipAddress='" + getIpAddress() + "'" +
            ", userAgent='" + getUserAgent() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            ", userId='" + getUserId() + "'" +
            ", userName='" + getUserName() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            ", relatedEmissionRecordId=" + getRelatedEmissionRecordId() +
            "}";
    }
}

package com.ecotrack.app.domain;

import com.ecotrack.app.domain.enumeration.AuditAction;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AuditTrail.
 */
@Entity
@Table(name = "audit_trail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AuditTrail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private AuditAction action;

    @Column(name = "entity_type")
    private String entityType;

    @Column(name = "entity_id")
    private String entityId;

    @Column(name = "old_values")
    private String oldValues;

    @Column(name = "new_values")
    private String newValues;

    @Column(name = "change_reason")
    private String changeReason;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_name")
    private String userName;

    @ManyToOne(fetch = FetchType.LAZY)
    private EmissionRecord relatedEmissionRecord;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AuditTrail id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuditAction getAction() {
        return this.action;
    }

    public AuditTrail action(AuditAction action) {
        this.setAction(action);
        return this;
    }

    public void setAction(AuditAction action) {
        this.action = action;
    }

    public String getEntityType() {
        return this.entityType;
    }

    public AuditTrail entityType(String entityType) {
        this.setEntityType(entityType);
        return this;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return this.entityId;
    }

    public AuditTrail entityId(String entityId) {
        this.setEntityId(entityId);
        return this;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getOldValues() {
        return this.oldValues;
    }

    public AuditTrail oldValues(String oldValues) {
        this.setOldValues(oldValues);
        return this;
    }

    public void setOldValues(String oldValues) {
        this.oldValues = oldValues;
    }

    public String getNewValues() {
        return this.newValues;
    }

    public AuditTrail newValues(String newValues) {
        this.setNewValues(newValues);
        return this;
    }

    public void setNewValues(String newValues) {
        this.newValues = newValues;
    }

    public String getChangeReason() {
        return this.changeReason;
    }

    public AuditTrail changeReason(String changeReason) {
        this.setChangeReason(changeReason);
        return this;
    }

    public void setChangeReason(String changeReason) {
        this.changeReason = changeReason;
    }

    public String getIpAddress() {
        return this.ipAddress;
    }

    public AuditTrail ipAddress(String ipAddress) {
        this.setIpAddress(ipAddress);
        return this;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return this.userAgent;
    }

    public AuditTrail userAgent(String userAgent) {
        this.setUserAgent(userAgent);
        return this;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public AuditTrail timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getUserId() {
        return this.userId;
    }

    public AuditTrail userId(String userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return this.userName;
    }

    public AuditTrail userName(String userName) {
        this.setUserName(userName);
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public EmissionRecord getRelatedEmissionRecord() {
        return this.relatedEmissionRecord;
    }

    public AuditTrail relatedEmissionRecord(EmissionRecord emissionRecord) {
        this.setRelatedEmissionRecord(emissionRecord);
        return this;
    }

    public void setRelatedEmissionRecord(EmissionRecord emissionRecord) {
        this.relatedEmissionRecord = emissionRecord;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public AuditTrail tenantId(String tenantId) {
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
        if (!(o instanceof AuditTrail)) {
            return false;
        }
        return getId() != null && getId().equals(((AuditTrail) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuditTrail{" +
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
            "}";
    }
}

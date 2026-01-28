package com.ecotrack.app.domain;

import com.ecotrack.app.domain.enumeration.Scope;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmissionRecord.
 */
@Entity
@Table(name = "emission_record")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmissionRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "scope", nullable = false)
    private Scope scope;

    @NotNull
    @Column(name = "carbon_grams", nullable = false)
    private Long carbonGrams;

    @Column(name = "date_recorded")
    private LocalDate dateRecorded;

    @Column(name = "source")
    private String source;

    @Column(name = "notes")
    private String notes;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "confidence_score")
    private Integer confidenceScore;

    @Column(name = "evidence_required")
    private Boolean evidenceRequired;

    @Column(name = "audit_required")
    private Boolean auditRequired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "emissionRecords", "passports", "supplier" }, allowSetters = true)
    private Product product;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "emissionRecord")
    @JsonIgnoreProperties(value = { "emissionRecord" }, allowSetters = true)
    private java.util.Set<EmissionEvidence> evidences = new java.util.LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "relatedEmissionRecord")
    @JsonIgnoreProperties(value = { "relatedEmissionRecord" }, allowSetters = true)
    private java.util.Set<AuditTrail> auditEntries = new java.util.LinkedHashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EmissionRecord id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Scope getScope() {
        return this.scope;
    }

    public EmissionRecord scope(Scope scope) {
        this.setScope(scope);
        return this;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public Long getCarbonGrams() {
        return this.carbonGrams;
    }

    public EmissionRecord carbonGrams(Long carbonGrams) {
        this.setCarbonGrams(carbonGrams);
        return this;
    }

    public void setCarbonGrams(Long carbonGrams) {
        this.carbonGrams = carbonGrams;
    }

    public LocalDate getDateRecorded() {
        return this.dateRecorded;
    }

    public EmissionRecord dateRecorded(LocalDate dateRecorded) {
        this.setDateRecorded(dateRecorded);
        return this;
    }

    public void setDateRecorded(LocalDate dateRecorded) {
        this.dateRecorded = dateRecorded;
    }

    public String getSource() {
        return this.source;
    }

    public EmissionRecord source(String source) {
        this.setSource(source);
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getNotes() {
        return this.notes;
    }

    public EmissionRecord notes(String notes) {
        this.setNotes(notes);
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getVerified() {
        return this.verified;
    }

    public EmissionRecord verified(Boolean verified) {
        this.setVerified(verified);
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Integer getConfidenceScore() {
        return this.confidenceScore;
    }

    public EmissionRecord confidenceScore(Integer confidenceScore) {
        this.setConfidenceScore(confidenceScore);
        return this;
    }

    public void setConfidenceScore(Integer confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public Boolean getEvidenceRequired() {
        return this.evidenceRequired;
    }

    public EmissionRecord evidenceRequired(Boolean evidenceRequired) {
        this.setEvidenceRequired(evidenceRequired);
        return this;
    }

    public void setEvidenceRequired(Boolean evidenceRequired) {
        this.evidenceRequired = evidenceRequired;
    }

    public Boolean getAuditRequired() {
        return this.auditRequired;
    }

    public EmissionRecord auditRequired(Boolean auditRequired) {
        this.setAuditRequired(auditRequired);
        return this;
    }

    public void setAuditRequired(Boolean auditRequired) {
        this.auditRequired = auditRequired;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public EmissionRecord product(Product product) {
        this.setProduct(product);
        return this;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public EmissionRecord tenantId(String tenantId) {
        this.setTenantId(tenantId);
        return this;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public java.util.Set<EmissionEvidence> getEvidences() {
        return this.evidences;
    }

    public void setEvidences(java.util.Set<EmissionEvidence> emissionEvidences) {
        if (this.evidences != null) {
            this.evidences.forEach(i -> i.setEmissionRecord(null));
        }
        if (emissionEvidences != null) {
            emissionEvidences.forEach(i -> i.setEmissionRecord(this));
        }
        this.evidences = emissionEvidences;
    }

    public EmissionRecord evidences(java.util.Set<EmissionEvidence> emissionEvidences) {
        this.setEvidences(emissionEvidences);
        return this;
    }

    public EmissionRecord addEvidences(EmissionEvidence emissionEvidence) {
        this.evidences.add(emissionEvidence);
        emissionEvidence.setEmissionRecord(this);
        return this;
    }

    public EmissionRecord removeEvidences(EmissionEvidence emissionEvidence) {
        this.evidences.remove(emissionEvidence);
        emissionEvidence.setEmissionRecord(null);
        return this;
    }

    public java.util.Set<AuditTrail> getAuditEntries() {
        return this.auditEntries;
    }

    public void setAuditEntries(java.util.Set<AuditTrail> auditTrails) {
        if (this.auditEntries != null) {
            this.auditEntries.forEach(i -> i.setRelatedEmissionRecord(null));
        }
        if (auditTrails != null) {
            auditTrails.forEach(i -> i.setRelatedEmissionRecord(this));
        }
        this.auditEntries = auditTrails;
    }

    public EmissionRecord auditEntries(java.util.Set<AuditTrail> auditTrails) {
        this.setAuditEntries(auditTrails);
        return this;
    }

    public EmissionRecord addAuditEntries(AuditTrail auditTrail) {
        this.auditEntries.add(auditTrail);
        auditTrail.setRelatedEmissionRecord(this);
        return this;
    }

    public EmissionRecord removeAuditEntries(AuditTrail auditTrail) {
        this.auditEntries.remove(auditTrail);
        auditTrail.setRelatedEmissionRecord(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmissionRecord)) {
            return false;
        }
        return getId() != null && getId().equals(((EmissionRecord) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmissionRecord{" +
            "id=" + getId() +
            ", scope='" + getScope() + "'" +
            ", carbonGrams=" + getCarbonGrams() +
            ", dateRecorded='" + getDateRecorded() + "'" +
            ", source='" + getSource() + "'" +
            ", notes='" + getNotes() + "'" +
            ", verified='" + getVerified() + "'" +
            ", confidenceScore=" + getConfidenceScore() +
            ", evidenceRequired='" + getEvidenceRequired() + "'" +
            ", auditRequired='" + getAuditRequired() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

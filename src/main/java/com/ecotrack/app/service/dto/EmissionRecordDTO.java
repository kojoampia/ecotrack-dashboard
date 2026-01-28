package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.Scope;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecotrack.app.domain.EmissionRecord} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmissionRecordDTO implements Serializable {

    private Long id;

    @NotNull
    private Scope scope;

    @NotNull
    private Long carbonGrams;

    private LocalDate dateRecorded;

    private String source;

    private String notes;

    private Boolean verified;

    private ProductDTO product;

    private String tenantId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Scope getScope() {
        return scope;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public Long getCarbonGrams() {
        return carbonGrams;
    }

    public void setCarbonGrams(Long carbonGrams) {
        this.carbonGrams = carbonGrams;
    }

    public LocalDate getDateRecorded() {
        return dateRecorded;
    }

    public void setDateRecorded(LocalDate dateRecorded) {
        this.dateRecorded = dateRecorded;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
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
        if (!(o instanceof EmissionRecordDTO)) {
            return false;
        }

        EmissionRecordDTO emissionRecordDTO = (EmissionRecordDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, emissionRecordDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmissionRecordDTO{" +
            "id=" + getId() +
            ", scope='" + getScope() + "'" +
            ", carbonGrams=" + getCarbonGrams() +
            ", dateRecorded='" + getDateRecorded() + "'" +
            ", source='" + getSource() + "'" +
            ", notes='" + getNotes() + "'" +
            ", verified='" + getVerified() + "'" +
            ", product=" + getProduct() +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

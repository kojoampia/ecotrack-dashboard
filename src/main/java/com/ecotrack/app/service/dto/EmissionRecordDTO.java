package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.Scope;
import jakarta.validation.constraints.*;
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

    private ProductDTO product;

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

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
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
            ", product=" + getProduct() +
            "}";
    }
}

package com.ecotrack.app.domain;

import com.ecotrack.app.domain.enumeration.Scope;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "emissionRecords", "supplier" }, allowSetters = true)
    private Product product;

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
            "}";
    }
}

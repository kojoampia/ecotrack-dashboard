package com.ecotrack.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "sku", nullable = false, unique = true)
    private String sku;

    @Column(name = "description")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "unit_of_measure")
    private String unitOfMeasure;

    @Column(name = "total_carbon_footprint", precision = 21, scale = 2)
    private BigDecimal totalCarbonFootprint;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "product" }, allowSetters = true)
    private Set<EmissionRecord> emissionRecords = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "product" }, allowSetters = true)
    private Set<ProductPassport> passports = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "products" }, allowSetters = true)
    private Supplier supplier;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return this.sku;
    }

    public Product sku(String sku) {
        this.setSku(sku);
        return this;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return this.category;
    }

    public Product category(String category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUnitOfMeasure() {
        return this.unitOfMeasure;
    }

    public Product unitOfMeasure(String unitOfMeasure) {
        this.setUnitOfMeasure(unitOfMeasure);
        return this;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public BigDecimal getTotalCarbonFootprint() {
        return this.totalCarbonFootprint;
    }

    public Product totalCarbonFootprint(BigDecimal totalCarbonFootprint) {
        this.setTotalCarbonFootprint(totalCarbonFootprint);
        return this;
    }

    public void setTotalCarbonFootprint(BigDecimal totalCarbonFootprint) {
        this.totalCarbonFootprint = totalCarbonFootprint;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Product createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return this.lastModifiedDate;
    }

    public Product lastModifiedDate(Instant lastModifiedDate) {
        this.setLastModifiedDate(lastModifiedDate);
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<EmissionRecord> getEmissionRecords() {
        return this.emissionRecords;
    }

    public void setEmissionRecords(Set<EmissionRecord> emissionRecords) {
        if (this.emissionRecords != null) {
            this.emissionRecords.forEach(i -> i.setProduct(null));
        }
        if (emissionRecords != null) {
            emissionRecords.forEach(i -> i.setProduct(this));
        }
        this.emissionRecords = emissionRecords;
    }

    public Product emissionRecords(Set<EmissionRecord> emissionRecords) {
        this.setEmissionRecords(emissionRecords);
        return this;
    }

    public Product addEmissionRecord(EmissionRecord emissionRecord) {
        this.emissionRecords.add(emissionRecord);
        emissionRecord.setProduct(this);
        return this;
    }

    public Product removeEmissionRecord(EmissionRecord emissionRecord) {
        this.emissionRecords.remove(emissionRecord);
        emissionRecord.setProduct(null);
        return this;
    }

    public Set<ProductPassport> getPassports() {
        return this.passports;
    }

    public void setPassports(Set<ProductPassport> productPassports) {
        if (this.passports != null) {
            this.passports.forEach(i -> i.setProduct(null));
        }
        if (productPassports != null) {
            productPassports.forEach(i -> i.setProduct(this));
        }
        this.passports = productPassports;
    }

    public Product passports(Set<ProductPassport> productPassports) {
        this.setPassports(productPassports);
        return this;
    }

    public Product addPassport(ProductPassport productPassport) {
        this.passports.add(productPassport);
        productPassport.setProduct(this);
        return this;
    }

    public Product removePassport(ProductPassport productPassport) {
        this.passports.remove(productPassport);
        productPassport.setProduct(null);
        return this;
    }

    public Supplier getSupplier() {
        return this.supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Product supplier(Supplier supplier) {
        this.setSupplier(supplier);
        return this;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public Product tenantId(String tenantId) {
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
        if (!(o instanceof Product)) {
            return false;
        }
        return getId() != null && getId().equals(((Product) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sku='" + getSku() + "'" +
            ", description='" + getDescription() + "'" +
            ", category='" + getCategory() + "'" +
            ", unitOfMeasure='" + getUnitOfMeasure() + "'" +
            ", totalCarbonFootprint=" + getTotalCarbonFootprint() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

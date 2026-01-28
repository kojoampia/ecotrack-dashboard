package com.ecotrack.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductPassport.
 */
@Entity
@Table(name = "product_passport")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProductPassport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "passport_data")
    private String passportData;

    @Column(name = "version")
    private Integer version;

    @Column(name = "created_date")
    private Instant createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "emissionRecords", "passports", "supplier" }, allowSetters = true)
    private Product product;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProductPassport id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassportData() {
        return this.passportData;
    }

    public ProductPassport passportData(String passportData) {
        this.setPassportData(passportData);
        return this;
    }

    public void setPassportData(String passportData) {
        this.passportData = passportData;
    }

    public Integer getVersion() {
        return this.version;
    }

    public ProductPassport version(Integer version) {
        this.setVersion(version);
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public ProductPassport createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductPassport product(Product product) {
        this.setProduct(product);
        return this;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public ProductPassport tenantId(String tenantId) {
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
        if (!(o instanceof ProductPassport)) {
            return false;
        }
        return getId() != null && getId().equals(((ProductPassport) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductPassport{" +
            "id=" + getId() +
            ", passportData='" + getPassportData() + "'" +
            ", version=" + getVersion() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

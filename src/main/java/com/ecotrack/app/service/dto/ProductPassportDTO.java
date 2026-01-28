package com.ecotrack.app.service.dto;

import jakarta.persistence.Lob;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecotrack.app.domain.ProductPassport} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProductPassportDTO implements Serializable {

    private Long id;

    @Lob
    private String passportData;

    private Integer version;

    private Instant createdDate;

    private ProductDTO product;

    private String tenantId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassportData() {
        return passportData;
    }

    public void setPassportData(String passportData) {
        this.passportData = passportData;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
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
        if (!(o instanceof ProductPassportDTO)) {
            return false;
        }

        ProductPassportDTO productPassportDTO = (ProductPassportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, productPassportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductPassportDTO{" +
            "id=" + getId() +
            ", passportData='" + getPassportData() + "'" +
            ", version=" + getVersion() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", product=" + getProduct() +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}

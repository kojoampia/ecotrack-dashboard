package com.ecotrack.app.domain;

import static com.ecotrack.app.domain.EmissionRecordTestSamples.*;
import static com.ecotrack.app.domain.ProductTestSamples.*;
import static com.ecotrack.app.domain.SupplierTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.ecotrack.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void emissionRecordTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        EmissionRecord emissionRecordBack = getEmissionRecordRandomSampleGenerator();

        product.addEmissionRecord(emissionRecordBack);
        assertThat(product.getEmissionRecords()).containsOnly(emissionRecordBack);
        assertThat(emissionRecordBack.getProduct()).isEqualTo(product);

        product.removeEmissionRecord(emissionRecordBack);
        assertThat(product.getEmissionRecords()).doesNotContain(emissionRecordBack);
        assertThat(emissionRecordBack.getProduct()).isNull();

        product.emissionRecords(new HashSet<>(Set.of(emissionRecordBack)));
        assertThat(product.getEmissionRecords()).containsOnly(emissionRecordBack);
        assertThat(emissionRecordBack.getProduct()).isEqualTo(product);

        product.setEmissionRecords(new HashSet<>());
        assertThat(product.getEmissionRecords()).doesNotContain(emissionRecordBack);
        assertThat(emissionRecordBack.getProduct()).isNull();
    }

    @Test
    void supplierTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        Supplier supplierBack = getSupplierRandomSampleGenerator();

        product.setSupplier(supplierBack);
        assertThat(product.getSupplier()).isEqualTo(supplierBack);

        product.supplier(null);
        assertThat(product.getSupplier()).isNull();
    }
}

package com.ecotrack.app.domain;

import static com.ecotrack.app.domain.ProductTestSamples.*;
import static com.ecotrack.app.domain.SupplierTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.ecotrack.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SupplierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supplier.class);
        Supplier supplier1 = getSupplierSample1();
        Supplier supplier2 = new Supplier();
        assertThat(supplier1).isNotEqualTo(supplier2);

        supplier2.setId(supplier1.getId());
        assertThat(supplier1).isEqualTo(supplier2);

        supplier2 = getSupplierSample2();
        assertThat(supplier1).isNotEqualTo(supplier2);
    }

    @Test
    void productTest() throws Exception {
        Supplier supplier = getSupplierRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        supplier.addProduct(productBack);
        assertThat(supplier.getProducts()).containsOnly(productBack);
        assertThat(productBack.getSupplier()).isEqualTo(supplier);

        supplier.removeProduct(productBack);
        assertThat(supplier.getProducts()).doesNotContain(productBack);
        assertThat(productBack.getSupplier()).isNull();

        supplier.products(new HashSet<>(Set.of(productBack)));
        assertThat(supplier.getProducts()).containsOnly(productBack);
        assertThat(productBack.getSupplier()).isEqualTo(supplier);

        supplier.setProducts(new HashSet<>());
        assertThat(supplier.getProducts()).doesNotContain(productBack);
        assertThat(productBack.getSupplier()).isNull();
    }
}

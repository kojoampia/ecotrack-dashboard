package com.ecotrack.app.domain;

import static com.ecotrack.app.domain.EmissionRecordTestSamples.*;
import static com.ecotrack.app.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.ecotrack.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmissionRecordTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmissionRecord.class);
        EmissionRecord emissionRecord1 = getEmissionRecordSample1();
        EmissionRecord emissionRecord2 = new EmissionRecord();
        assertThat(emissionRecord1).isNotEqualTo(emissionRecord2);

        emissionRecord2.setId(emissionRecord1.getId());
        assertThat(emissionRecord1).isEqualTo(emissionRecord2);

        emissionRecord2 = getEmissionRecordSample2();
        assertThat(emissionRecord1).isNotEqualTo(emissionRecord2);
    }

    @Test
    void productTest() throws Exception {
        EmissionRecord emissionRecord = getEmissionRecordRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        emissionRecord.setProduct(productBack);
        assertThat(emissionRecord.getProduct()).isEqualTo(productBack);

        emissionRecord.product(null);
        assertThat(emissionRecord.getProduct()).isNull();
    }
}

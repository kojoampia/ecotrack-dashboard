package com.ecotrack.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecotrack.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmissionRecordDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmissionRecordDTO.class);
        EmissionRecordDTO emissionRecordDTO1 = new EmissionRecordDTO();
        emissionRecordDTO1.setId(1L);
        EmissionRecordDTO emissionRecordDTO2 = new EmissionRecordDTO();
        assertThat(emissionRecordDTO1).isNotEqualTo(emissionRecordDTO2);
        emissionRecordDTO2.setId(emissionRecordDTO1.getId());
        assertThat(emissionRecordDTO1).isEqualTo(emissionRecordDTO2);
        emissionRecordDTO2.setId(2L);
        assertThat(emissionRecordDTO1).isNotEqualTo(emissionRecordDTO2);
        emissionRecordDTO1.setId(null);
        assertThat(emissionRecordDTO1).isNotEqualTo(emissionRecordDTO2);
    }
}

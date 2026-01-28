package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.EmissionEvidence;
import com.ecotrack.app.domain.EmissionRecord;
import com.ecotrack.app.service.dto.EmissionEvidenceDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmissionEvidence} and its DTO {@link EmissionEvidenceDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmissionEvidenceMapper extends EntityMapper<EmissionEvidenceDTO, EmissionEvidence> {
    @Mapping(target = "emissionRecordId", source = "emissionRecord.id")
    EmissionEvidenceDTO toDto(EmissionEvidence s);
}

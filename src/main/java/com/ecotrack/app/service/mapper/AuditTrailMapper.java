package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.AuditTrail;
import com.ecotrack.app.domain.EmissionRecord;
import com.ecotrack.app.service.dto.AuditTrailDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AuditTrail} and its DTO {@link AuditTrailDTO}.
 */
@Mapper(componentModel = "spring")
public interface AuditTrailMapper extends EntityMapper<AuditTrailDTO, AuditTrail> {
    @Mapping(target = "relatedEmissionRecordId", source = "relatedEmissionRecord.id")
    AuditTrailDTO toDto(AuditTrail s);
}

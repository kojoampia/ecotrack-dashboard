package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.ComplianceReport;
import com.ecotrack.app.service.dto.ComplianceReportDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ComplianceReport} and its DTO {@link ComplianceReportDTO}.
 */
@Mapper(componentModel = "spring")
public interface ComplianceReportMapper extends EntityMapper<ComplianceReportDTO, ComplianceReport> {}

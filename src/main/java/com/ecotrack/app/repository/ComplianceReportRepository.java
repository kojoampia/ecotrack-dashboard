package com.ecotrack.app.repository;

import com.ecotrack.app.domain.ComplianceReport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ComplianceReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplianceReportRepository extends JpaRepository<ComplianceReport, Long> {}

package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.ComplianceReportDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecotrack.app.domain.ComplianceReport}.
 */
public interface ComplianceReportService {
    /**
     * Save a complianceReport.
     *
     * @param complianceReportDTO the entity to save.
     * @return the persisted entity.
     */
    ComplianceReportDTO save(ComplianceReportDTO complianceReportDTO);

    /**
     * Updates a complianceReport.
     *
     * @param complianceReportDTO the entity to update.
     * @return the persisted entity.
     */
    ComplianceReportDTO update(ComplianceReportDTO complianceReportDTO);

    /**
     * Partially updates a complianceReport.
     *
     * @param complianceReportDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ComplianceReportDTO> partialUpdate(ComplianceReportDTO complianceReportDTO);

    /**
     * Get all the complianceReports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ComplianceReportDTO> findAll(Pageable pageable);

    /**
     * Get one complianceReport by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ComplianceReportDTO> findOne(Long id);

    /**
     * Delete the complianceReport by id.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Generate audit-ready PDF report for the compliance report.
     *
     * @param id the id of the compliance report.
     * @return byte array of the PDF report.
     */
    byte[] generateAuditReport(Long id);
}

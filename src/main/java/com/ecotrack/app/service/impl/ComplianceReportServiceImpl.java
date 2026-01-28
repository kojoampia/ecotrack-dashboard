package com.ecotrack.app.service.impl;

import com.ecotrack.app.config.TenantContext;
import com.ecotrack.app.domain.ComplianceReport;
import com.ecotrack.app.repository.ComplianceReportRepository;
import com.ecotrack.app.service.ComplianceReportService;
import com.ecotrack.app.service.dto.ComplianceReportDTO;
import com.ecotrack.app.service.mapper.ComplianceReportMapper;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.ecotrack.app.domain.ComplianceReport}.
 */
@Service
@Transactional
public class ComplianceReportServiceImpl implements ComplianceReportService {

    private final Logger log = LoggerFactory.getLogger(ComplianceReportServiceImpl.class);

    private final ComplianceReportRepository complianceReportRepository;

    private final ComplianceReportMapper complianceReportMapper;

    public ComplianceReportServiceImpl(
        ComplianceReportRepository complianceReportRepository,
        ComplianceReportMapper complianceReportMapper
    ) {
        this.complianceReportRepository = complianceReportRepository;
        this.complianceReportMapper = complianceReportMapper;
    }

    @Override
    public ComplianceReportDTO save(ComplianceReportDTO complianceReportDTO) {
        log.debug("Request to save ComplianceReport : {}", complianceReportDTO);
        ComplianceReport complianceReport = complianceReportMapper.toEntity(complianceReportDTO);
        complianceReport.setTenantId(TenantContext.getCurrentTenant());
        complianceReport = complianceReportRepository.save(complianceReport);
        return complianceReportMapper.toDto(complianceReport);
    }

    @Override
    public ComplianceReportDTO update(ComplianceReportDTO complianceReportDTO) {
        log.debug("Request to update ComplianceReport : {}", complianceReportDTO);
        ComplianceReport complianceReport = complianceReportMapper.toEntity(complianceReportDTO);
        complianceReport.setTenantId(TenantContext.getCurrentTenant());
        complianceReport = complianceReportRepository.save(complianceReport);
        return complianceReportMapper.toDto(complianceReport);
    }

    @Override
    public Optional<ComplianceReportDTO> partialUpdate(ComplianceReportDTO complianceReportDTO) {
        log.debug("Request to partially update ComplianceReport : {}", complianceReportDTO);

        return complianceReportRepository
            .findById(complianceReportDTO.getId())
            .map(existingComplianceReport -> {
                complianceReportMapper.partialUpdate(existingComplianceReport, complianceReportDTO);

                return existingComplianceReport;
            })
            .map(complianceReportRepository::save)
            .map(complianceReportMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ComplianceReportDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ComplianceReports");
        return complianceReportRepository.findAll(pageable).map(complianceReportMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ComplianceReportDTO> findOne(Long id) {
        log.debug("Request to get ComplianceReport : {}", id);
        return complianceReportRepository.findById(id).map(complianceReportMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComplianceReport : {}", id);
        complianceReportRepository.deleteById(id);
    }

    @Override
    public byte[] generateAuditReport(Long id) {
        log.debug("Request to generate audit report for ComplianceReport : {}", id);

        Optional<ComplianceReport> complianceReportOpt = complianceReportRepository.findById(id);
        if (complianceReportOpt.isEmpty()) {
            throw new IllegalArgumentException("ComplianceReport not found with id: " + id);
        }

        ComplianceReport report = complianceReportOpt.get();

        try {
            // Load the JasperReports template
            InputStream reportStream = getClass().getResourceAsStream("/reports/audit-report.jrxml");
            if (reportStream == null) {
                throw new RuntimeException("Report template not found: /reports/audit-report.jrxml");
            }

            // Compile the report
            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

            // Prepare data for the report
            Map<String, Object> parameters = new HashMap<>();
            String reportYear = report.getReportPeriodStart() != null
                ? String.valueOf(LocalDate.ofInstant(report.getReportPeriodStart(), ZoneId.systemDefault()).getYear())
                : "2025";
            parameters.put("REPORT_TITLE", "CBAM Compliance Report - " + reportYear);
            parameters.put("COMPANY_NAME", "Company Name"); // TODO: Get from tenant/user context
            parameters.put("REPORT_PERIOD", report.getReportPeriodStart() + " to " + report.getReportPeriodEnd());
            parameters.put("TOTAL_EMISSIONS", report.getTotalEmissions() != null ? report.getTotalEmissions().doubleValue() : 0.0);
            parameters.put("SCOPE1_EMISSIONS", report.getScope1Emissions() != null ? report.getScope1Emissions().doubleValue() : 0.0);
            parameters.put("SCOPE2_EMISSIONS", report.getScope2Emissions() != null ? report.getScope2Emissions().doubleValue() : 0.0);
            parameters.put("SCOPE3_EMISSIONS", report.getScope3Emissions() != null ? report.getScope3Emissions().doubleValue() : 0.0);
            parameters.put("CONFIDENCE_SCORE", report.getComplianceScore() != null ? report.getComplianceScore().intValue() : 0);

            // For the ledger data, we would need to fetch emission records
            // For now, using empty collection - this would be populated with actual data
            JRBeanCollectionDataSource ledgerDataSource = new JRBeanCollectionDataSource(java.util.Collections.emptyList());

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, ledgerDataSource);

            // Export to PDF
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("Error generating audit report", e);
            throw new RuntimeException("Failed to generate audit report", e);
        }
    }
}

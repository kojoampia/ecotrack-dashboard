package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.CompliancePayloadDTO;
import java.time.Year;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service for managing CBAM compliance payload generation and retrieval.
 * Handles automated compliance reporting for EU TARIC system requirements.
 */
public interface CompliancePayloadService {
    /**
     * Generates a new compliance payload for the specified tenant and year.
     * @param tenantId the tenant identifier
     * @param year the reporting year
     * @param jwtToken the JWT token for authentication
     * @param outputFormat the output format (json or xml)
     * @return the generated compliance payload
     */
    CompliancePayloadDTO generatePayload(String tenantId, Year year, String jwtToken, String outputFormat);

    /**
     * Retrieves a compliance payload by ID.
     * @param id the payload ID
     * @return the compliance payload if found
     */
    Optional<CompliancePayloadDTO> findById(Long id);

    /**
     * Retrieves all compliance payloads for a tenant with pagination.
     * @param tenantId the tenant identifier
     * @param pageable pagination information
     * @return paginated list of compliance payloads
     */
    Page<CompliancePayloadDTO> findByTenantId(String tenantId, Pageable pageable);

    /**
     * Retrieves compliance payloads by tenant and year with pagination.
     * @param tenantId the tenant identifier
     * @param year the reporting year
     * @param pageable pagination information
     * @return paginated list of compliance payloads
     */
    Page<CompliancePayloadDTO> findByTenantIdAndYear(String tenantId, Year year, Pageable pageable);

    /**
     * Deletes a compliance payload by ID.
     * @param id the payload ID
     */
    void deleteById(Long id);

    /**
     * Validates a compliance payload for TARIC system requirements.
     * @param payload the payload to validate
     * @return validation result with any errors
     */
    ComplianceValidationResult validatePayload(CompliancePayloadDTO payload);

    /**
     * Inner class for validation results.
     */
    class ComplianceValidationResult {

        private final boolean valid;
        private final String errorMessage;

        public ComplianceValidationResult(boolean valid, String errorMessage) {
            this.valid = valid;
            this.errorMessage = errorMessage;
        }

        public boolean isValid() {
            return valid;
        }

        public String getErrorMessage() {
            return errorMessage;
        }
    }
}

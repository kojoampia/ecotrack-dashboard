package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;

/**
 * Service for carbon emission calculations.
 */
public interface CarbonCalculationService {
    /**
     * Calculates carbon emissions based on input data.
     * Formula: E = A * EF * (1 - ER)
     * @param input the calculation input
     * @return the calculated emission record DTO
     */
    EmissionRecordDTO calculateEmission(CarbonCalculationInputDTO input);

    /**
     * Calculates and saves carbon emissions asynchronously.
     * @param input the calculation input
     */
    void calculateAndSaveEmission(CarbonCalculationInputDTO input);
}

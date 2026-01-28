package com.ecotrack.app.service.strategy;

import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;

/**
 * Strategy interface for carbon emission calculations.
 * Implements the Strategy Pattern to handle different calculation methods
 * based on emission scope and regulatory requirements.
 */
public interface CarbonCalculationStrategy {
    /**
     * Calculates carbon emissions using scope-specific methodology.
     * @param input the calculation input data
     * @return the calculated emission record
     */
    EmissionRecordDTO calculate(CarbonCalculationInputDTO input);

    /**
     * Returns the scope this strategy handles.
     * @return the emission scope
     */
    com.ecotrack.app.domain.enumeration.Scope getScope();
}

package com.ecotrack.app.service.strategy;

import com.ecotrack.app.domain.enumeration.Scope;
import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Strategy for calculating Scope 2 emissions from grid electricity consumption.
 * Uses 2026 EU average grid emission factor of 125 gCO2e/kWh.
 * Formula: E = A * EF * (1 - ER)
 * Where:
 * - E = emissions in grams
 * - A = activity data (kWh consumed)
 * - EF = emission factor (125 gCO2e/kWh for 2026 EU grid)
 * - ER = efficiency ratio (renewable energy percentage)
 */
@Component
public class GridElectricityStrategy implements CarbonCalculationStrategy {

    private static final Logger log = LoggerFactory.getLogger(GridElectricityStrategy.class);

    // 2026 EU average grid emission factor: 125 gCO2e/kWh
    private static final BigDecimal EU_GRID_EMISSION_FACTOR_2026 = new BigDecimal("125");

    @Override
    public EmissionRecordDTO calculate(CarbonCalculationInputDTO input) {
        log.debug("Calculating Scope 2 emissions for grid electricity: {}", input);

        // Use provided emission factor or default to 2026 EU average
        BigDecimal emissionFactor = input.getEmissionFactor() != null ? input.getEmissionFactor() : EU_GRID_EMISSION_FACTOR_2026;

        // Activity data (electricity consumption in kWh)
        BigDecimal activityData = input.getActivityData();
        if (activityData == null) {
            throw new IllegalArgumentException("Activity data (electricity consumption) is required for Scope 2 calculations");
        }

        // Efficiency ratio (percentage of renewable energy, default 0)
        BigDecimal efficiencyRatio = input.getEfficiencyRatio() != null ? input.getEfficiencyRatio() : BigDecimal.ZERO;

        // Formula: E = A * EF * (1 - ER)
        BigDecimal emissions = activityData
            .multiply(emissionFactor)
            .multiply(BigDecimal.ONE.subtract(efficiencyRatio.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP)));

        // Convert to long for storage (grams)
        long carbonGrams = emissions.setScale(0, RoundingMode.HALF_UP).longValue();

        EmissionRecordDTO result = new EmissionRecordDTO();
        result.setScope(Scope.SCOPE_2);
        result.setCarbonGrams(carbonGrams);
        result.setDateRecorded(input.getDateRecorded());
        result.setSource(input.getSource() != null ? input.getSource() : "Grid Electricity Consumption");
        result.setNotes(
            input.getNotes() != null
                ? input.getNotes()
                : String.format(
                    "EU Grid 2026 - EF: %s gCO2e/kWh, Consumption: %s kWh, Renewable: %s%%",
                    emissionFactor,
                    activityData,
                    efficiencyRatio
                )
        );
        result.setVerified(false);

        log.debug("Calculated Scope 2 emissions: {} grams", carbonGrams);
        return result;
    }

    @Override
    public Scope getScope() {
        return Scope.SCOPE_2;
    }
}

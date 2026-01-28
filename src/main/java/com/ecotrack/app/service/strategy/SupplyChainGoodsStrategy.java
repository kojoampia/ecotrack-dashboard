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
 * Strategy for calculating Scope 3 emissions from supply chain goods.
 * Handles various types of purchased goods and services with different emission factors.
 * Formula: E = A * EF * (1 - ER)
 * Where:
 * - E = emissions in grams
 * - A = activity data (quantity/weight/cost of goods)
 * - EF = emission factor (varies by goods type)
 * - ER = efficiency ratio (supplier sustainability improvements)
 */
@Component
public class SupplyChainGoodsStrategy implements CarbonCalculationStrategy {

    private static final Logger log = LoggerFactory.getLogger(SupplyChainGoodsStrategy.class);

    // Default emission factors for different goods categories (kgCO2e per unit)
    // These are representative values for 2026 based on CBAM requirements
    private static final BigDecimal STEEL_EMISSION_FACTOR = new BigDecimal("2.1"); // kgCO2e/kg
    private static final BigDecimal CEMENT_EMISSION_FACTOR = new BigDecimal("0.8"); // kgCO2e/kg
    private static final BigDecimal ALUMINIUM_EMISSION_FACTOR = new BigDecimal("8.5"); // kgCO2e/kg
    private static final BigDecimal FERTILIZER_EMISSION_FACTOR = new BigDecimal("3.2"); // kgCO2e/kg
    private static final BigDecimal GENERIC_GOODS_FACTOR = new BigDecimal("1.5"); // kgCO2e/kg default

    @Override
    public EmissionRecordDTO calculate(CarbonCalculationInputDTO input) {
        log.debug("Calculating Scope 3 emissions for supply chain goods: {}", input);

        // Activity data (quantity/weight/cost of goods)
        BigDecimal activityData = input.getActivityData();
        if (activityData == null) {
            throw new IllegalArgumentException("Activity data (goods quantity/weight) is required for Scope 3 calculations");
        }

        // Determine emission factor based on goods type from source/notes
        BigDecimal emissionFactor = determineEmissionFactor(input);

        // Efficiency ratio (supplier improvements, default 0)
        BigDecimal efficiencyRatio = input.getEfficiencyRatio() != null ? input.getEfficiencyRatio() : BigDecimal.ZERO;

        // Formula: E = A * EF * (1 - ER)
        // Convert kgCO2e to grams: multiply by 1000
        BigDecimal emissionsKg = activityData
            .multiply(emissionFactor)
            .multiply(BigDecimal.ONE.subtract(efficiencyRatio.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP)));

        long carbonGrams = emissionsKg.multiply(new BigDecimal("1000")).setScale(0, RoundingMode.HALF_UP).longValue();

        EmissionRecordDTO result = new EmissionRecordDTO();
        result.setScope(Scope.SCOPE_3);
        result.setCarbonGrams(carbonGrams);
        result.setDateRecorded(input.getDateRecorded());
        result.setSource(input.getSource() != null ? input.getSource() : "Supply Chain Goods");
        result.setNotes(
            input.getNotes() != null
                ? input.getNotes()
                : String.format(
                    "Supply Chain Goods - EF: %s kgCO2e/unit, Quantity: %s units, Efficiency: %s%%",
                    emissionFactor,
                    activityData,
                    efficiencyRatio
                )
        );
        result.setVerified(false);

        log.debug("Calculated Scope 3 emissions: {} grams", carbonGrams);
        return result;
    }

    /**
     * Determines the appropriate emission factor based on goods type.
     * In a production system, this would query a database of emission factors.
     */
    private BigDecimal determineEmissionFactor(CarbonCalculationInputDTO input) {
        // Use provided emission factor if available
        if (input.getEmissionFactor() != null) {
            return input.getEmissionFactor();
        }

        // Otherwise, determine from source/notes (simplified logic)
        String source = (input.getSource() != null ? input.getSource() : "").toLowerCase();
        String notes = (input.getNotes() != null ? input.getNotes() : "").toLowerCase();

        String combinedText = source + " " + notes;

        if (combinedText.contains("steel")) {
            return STEEL_EMISSION_FACTOR;
        } else if (combinedText.contains("cement")) {
            return CEMENT_EMISSION_FACTOR;
        } else if (combinedText.contains("aluminium") || combinedText.contains("aluminum")) {
            return ALUMINIUM_EMISSION_FACTOR;
        } else if (combinedText.contains("fertilizer")) {
            return FERTILIZER_EMISSION_FACTOR;
        } else {
            // Default factor for unspecified goods
            return GENERIC_GOODS_FACTOR;
        }
    }

    @Override
    public Scope getScope() {
        return Scope.SCOPE_3;
    }
}

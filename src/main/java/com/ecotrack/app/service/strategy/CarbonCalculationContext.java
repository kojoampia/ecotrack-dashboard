package com.ecotrack.app.service.strategy;

import com.ecotrack.app.domain.enumeration.Scope;
import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Context class for carbon calculation strategies.
 * Implements the Strategy Pattern to select and execute appropriate
 * calculation methods based on emission scope.
 */
@Component
public class CarbonCalculationContext {

    private static final Logger log = LoggerFactory.getLogger(CarbonCalculationContext.class);

    private final Map<Scope, CarbonCalculationStrategy> strategies = new HashMap<>();

    private final GridElectricityStrategy gridElectricityStrategy;
    private final SupplyChainGoodsStrategy supplyChainGoodsStrategy;

    public CarbonCalculationContext(GridElectricityStrategy gridElectricityStrategy, SupplyChainGoodsStrategy supplyChainGoodsStrategy) {
        this.gridElectricityStrategy = gridElectricityStrategy;
        this.supplyChainGoodsStrategy = supplyChainGoodsStrategy;
    }

    @PostConstruct
    public void initializeStrategies() {
        strategies.put(Scope.SCOPE_2, gridElectricityStrategy);
        strategies.put(Scope.SCOPE_3, supplyChainGoodsStrategy);
        log.info("Initialized carbon calculation strategies for scopes: {}", strategies.keySet());
    }

    /**
     * Calculates emissions using the appropriate strategy for the given scope.
     * @param input the calculation input
     * @return the calculated emission record
     * @throws IllegalArgumentException if no strategy exists for the scope
     */
    public EmissionRecordDTO calculate(CarbonCalculationInputDTO input) {
        if (input.getScope() == null) {
            throw new IllegalArgumentException("Scope is required for carbon calculations");
        }

        CarbonCalculationStrategy strategy = strategies.get(input.getScope());
        if (strategy == null) {
            throw new IllegalArgumentException("No calculation strategy available for scope: " + input.getScope());
        }

        log.debug("Using strategy {} for scope {}", strategy.getClass().getSimpleName(), input.getScope());
        return strategy.calculate(input);
    }

    /**
     * Registers a new calculation strategy for a scope.
     * @param scope the emission scope
     * @param strategy the calculation strategy
     */
    public void registerStrategy(Scope scope, CarbonCalculationStrategy strategy) {
        strategies.put(scope, strategy);
        log.info("Registered new strategy {} for scope {}", strategy.getClass().getSimpleName(), scope);
    }
}

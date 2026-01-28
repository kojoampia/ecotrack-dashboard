package com.ecotrack.app.service.impl;

import com.ecotrack.app.config.TenantContext;
import com.ecotrack.app.service.CarbonCalculationService;
import com.ecotrack.app.service.EmissionRecordService;
import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import com.ecotrack.app.service.mapper.CarbonCalculationMapper;
import com.ecotrack.app.service.strategy.CarbonCalculationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for carbon emission calculations.
 * Uses Strategy Pattern to handle different calculation methodologies
 * for Scope 2 (Grid Electricity) and Scope 3 (Supply Chain Goods).
 */
@Service
@Transactional
public class CarbonCalculationServiceImpl implements CarbonCalculationService {

    private final Logger log = LoggerFactory.getLogger(CarbonCalculationServiceImpl.class);

    private final CarbonCalculationContext calculationContext;
    private final CarbonCalculationMapper carbonCalculationMapper;
    private final EmissionRecordService emissionRecordService;

    public CarbonCalculationServiceImpl(
        CarbonCalculationContext calculationContext,
        CarbonCalculationMapper carbonCalculationMapper,
        EmissionRecordService emissionRecordService
    ) {
        this.calculationContext = calculationContext;
        this.carbonCalculationMapper = carbonCalculationMapper;
        this.emissionRecordService = emissionRecordService;
    }

    @Override
    public EmissionRecordDTO calculateEmission(CarbonCalculationInputDTO input) {
        log.debug("Request to calculate emission for input: {}", input);

        // Use strategy pattern for scope-specific calculations
        return calculationContext.calculate(input);
    }

    @Override
    @Async
    public void calculateAndSaveEmission(CarbonCalculationInputDTO input) {
        log.debug("Async request to calculate and save emission for input: {}", input);

        EmissionRecordDTO emissionRecordDTO = calculationContext.calculate(input);
        emissionRecordDTO.setTenantId(TenantContext.getCurrentTenant());
        emissionRecordService.save(emissionRecordDTO);
    }
}

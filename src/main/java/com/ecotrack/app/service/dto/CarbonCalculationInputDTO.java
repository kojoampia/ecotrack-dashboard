package com.ecotrack.app.service.dto;

import com.ecotrack.app.domain.enumeration.Scope;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for carbon calculation input.
 */
public class CarbonCalculationInputDTO {

    private BigDecimal activityData; // A
    private BigDecimal emissionFactor; // EF
    private BigDecimal efficiencyRatio; // ER
    private Scope scope;
    private LocalDate dateRecorded;
    private String source;
    private String notes;
    private Long productId; // to associate with product

    // Getters and setters

    public BigDecimal getActivityData() {
        return activityData;
    }

    public void setActivityData(BigDecimal activityData) {
        this.activityData = activityData;
    }

    public BigDecimal getEmissionFactor() {
        return emissionFactor;
    }

    public void setEmissionFactor(BigDecimal emissionFactor) {
        this.emissionFactor = emissionFactor;
    }

    public BigDecimal getEfficiencyRatio() {
        return efficiencyRatio;
    }

    public void setEfficiencyRatio(BigDecimal efficiencyRatio) {
        this.efficiencyRatio = efficiencyRatio;
    }

    public Scope getScope() {
        return scope;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public LocalDate getDateRecorded() {
        return dateRecorded;
    }

    public void setDateRecorded(LocalDate dateRecorded) {
        this.dateRecorded = dateRecorded;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setActivity(double asDouble) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}

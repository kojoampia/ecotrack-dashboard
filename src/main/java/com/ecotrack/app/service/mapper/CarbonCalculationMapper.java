package com.ecotrack.app.service.mapper;

import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import com.ecotrack.app.service.dto.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for carbon calculation input to emission record.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CarbonCalculationMapper {
    @Mapping(target = "scope", source = "scope")
    @Mapping(target = "carbonGrams", expression = "java(calculateEmissions(input))")
    @Mapping(target = "dateRecorded", source = "dateRecorded")
    @Mapping(target = "source", source = "source")
    @Mapping(target = "notes", source = "notes")
    @Mapping(target = "verified", constant = "false")
    @Mapping(target = "product", expression = "java(mapProduct(input.getProductId()))")
    EmissionRecordDTO toEmissionRecordDTO(CarbonCalculationInputDTO input);

    default Long calculateEmissions(CarbonCalculationInputDTO input) {
        // Formula: E = A * EF * (1 - ER)
        // Assuming all in kg, convert to grams
        return input
            .getActivityData()
            .multiply(input.getEmissionFactor())
            .multiply(java.math.BigDecimal.ONE.subtract(input.getEfficiencyRatio()))
            .multiply(java.math.BigDecimal.valueOf(1000))
            .longValue();
    }

    default ProductDTO mapProduct(Long productId) {
        if (productId == null) {
            return null;
        }
        ProductDTO product = new ProductDTO();
        product.setId(productId);
        return product;
    }
}

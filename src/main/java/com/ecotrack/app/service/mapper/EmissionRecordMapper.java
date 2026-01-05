package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.EmissionRecord;
import com.ecotrack.app.domain.Product;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import com.ecotrack.app.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmissionRecord} and its DTO {@link EmissionRecordDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmissionRecordMapper extends EntityMapper<EmissionRecordDTO, EmissionRecord> {
    @Mapping(target = "product", source = "product", qualifiedByName = "productName")
    EmissionRecordDTO toDto(EmissionRecord s);

    @Named("productName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ProductDTO toDtoProductName(Product product);
}

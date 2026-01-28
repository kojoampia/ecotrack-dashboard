package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.Product;
import com.ecotrack.app.domain.ProductPassport;
import com.ecotrack.app.service.dto.ProductDTO;
import com.ecotrack.app.service.dto.ProductPassportDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductPassport} and its DTO {@link ProductPassportDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductPassportMapper extends EntityMapper<ProductPassportDTO, ProductPassport> {
    @Mapping(target = "product", source = "product", qualifiedByName = "productSku")
    ProductPassportDTO toDto(ProductPassport s);

    @Named("productSku")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "sku", source = "sku")
    ProductDTO toDtoProductSku(Product product);
}

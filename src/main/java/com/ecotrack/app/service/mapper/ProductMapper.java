package com.ecotrack.app.service.mapper;

import com.ecotrack.app.domain.Product;
import com.ecotrack.app.domain.Supplier;
import com.ecotrack.app.service.dto.ProductDTO;
import com.ecotrack.app.service.dto.SupplierDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Mapping(target = "supplier", source = "supplier", qualifiedByName = "supplierCompanyName")
    ProductDTO toDto(Product s);

    @Named("supplierCompanyName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "companyName", source = "companyName")
    SupplierDTO toDtoSupplierCompanyName(Supplier supplier);
}

package com.ecotrack.app.service.impl;

import com.ecotrack.app.config.TenantContext;
import com.ecotrack.app.domain.ProductPassport;
import com.ecotrack.app.repository.ProductPassportRepository;
import com.ecotrack.app.service.ProductPassportService;
import com.ecotrack.app.service.dto.ProductPassportDTO;
import com.ecotrack.app.service.mapper.ProductPassportMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.ecotrack.app.domain.ProductPassport}.
 */
@Service
@Transactional
public class ProductPassportServiceImpl implements ProductPassportService {

    private final Logger log = LoggerFactory.getLogger(ProductPassportServiceImpl.class);

    private final ProductPassportRepository productPassportRepository;

    private final ProductPassportMapper productPassportMapper;

    public ProductPassportServiceImpl(ProductPassportRepository productPassportRepository, ProductPassportMapper productPassportMapper) {
        this.productPassportRepository = productPassportRepository;
        this.productPassportMapper = productPassportMapper;
    }

    @Override
    public ProductPassportDTO save(ProductPassportDTO productPassportDTO) {
        log.debug("Request to save ProductPassport : {}", productPassportDTO);
        ProductPassport productPassport = productPassportMapper.toEntity(productPassportDTO);
        productPassport.setTenantId(TenantContext.getCurrentTenant());
        productPassport = productPassportRepository.save(productPassport);
        return productPassportMapper.toDto(productPassport);
    }

    @Override
    public ProductPassportDTO update(ProductPassportDTO productPassportDTO) {
        log.debug("Request to update ProductPassport : {}", productPassportDTO);
        ProductPassport productPassport = productPassportMapper.toEntity(productPassportDTO);
        productPassport.setTenantId(TenantContext.getCurrentTenant());
        productPassport = productPassportRepository.save(productPassport);
        return productPassportMapper.toDto(productPassport);
    }

    @Override
    public Optional<ProductPassportDTO> partialUpdate(ProductPassportDTO productPassportDTO) {
        log.debug("Request to partially update ProductPassport : {}", productPassportDTO);

        return productPassportRepository
            .findById(productPassportDTO.getId())
            .map(existingProductPassport -> {
                productPassportMapper.partialUpdate(existingProductPassport, productPassportDTO);

                return existingProductPassport;
            })
            .map(productPassportRepository::save)
            .map(productPassportMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductPassportDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProductPassports");
        return productPassportRepository.findAll(pageable).map(productPassportMapper::toDto);
    }

    public Page<ProductPassportDTO> findAllWithEagerRelationships(Pageable pageable) {
        return productPassportRepository.findAllWithEagerRelationships(pageable).map(productPassportMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductPassportDTO> findOne(Long id) {
        log.debug("Request to get ProductPassport : {}", id);
        return productPassportRepository.findOneWithEagerRelationships(id).map(productPassportMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductPassport : {}", id);
        productPassportRepository.deleteById(id);
    }
}

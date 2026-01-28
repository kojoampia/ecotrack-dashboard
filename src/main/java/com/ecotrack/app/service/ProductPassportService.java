package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.ProductPassportDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecotrack.app.domain.ProductPassport}.
 */
public interface ProductPassportService {
    /**
     * Save a productPassport.
     *
     * @param productPassportDTO the entity to save.
     * @return the persisted entity.
     */
    ProductPassportDTO save(ProductPassportDTO productPassportDTO);

    /**
     * Updates a productPassport.
     *
     * @param productPassportDTO the entity to update.
     * @return the persisted entity.
     */
    ProductPassportDTO update(ProductPassportDTO productPassportDTO);

    /**
     * Partially updates a productPassport.
     *
     * @param productPassportDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProductPassportDTO> partialUpdate(ProductPassportDTO productPassportDTO);

    /**
     * Get all the productPassports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductPassportDTO> findAll(Pageable pageable);

    /**
     * Get all the productPassports with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductPassportDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" productPassport.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductPassportDTO> findOne(Long id);

    /**
     * Delete the "id" productPassport.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

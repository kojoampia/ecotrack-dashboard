package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.EmissionRecordDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecotrack.app.domain.EmissionRecord}.
 */
public interface EmissionRecordService {
    /**
     * Save a emissionRecord.
     *
     * @param emissionRecordDTO the entity to save.
     * @return the persisted entity.
     */
    EmissionRecordDTO save(EmissionRecordDTO emissionRecordDTO);

    /**
     * Updates a emissionRecord.
     *
     * @param emissionRecordDTO the entity to update.
     * @return the persisted entity.
     */
    EmissionRecordDTO update(EmissionRecordDTO emissionRecordDTO);

    /**
     * Partially updates a emissionRecord.
     *
     * @param emissionRecordDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EmissionRecordDTO> partialUpdate(EmissionRecordDTO emissionRecordDTO);

    /**
     * Get all the emissionRecords.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EmissionRecordDTO> findAll(Pageable pageable);

    /**
     * Get all the emissionRecords with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EmissionRecordDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" emissionRecord.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmissionRecordDTO> findOne(Long id);

    /**
     * Delete the "id" emissionRecord.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

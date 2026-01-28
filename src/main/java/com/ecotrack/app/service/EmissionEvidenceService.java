package com.ecotrack.app.service;

import com.ecotrack.app.service.dto.EmissionEvidenceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ecotrack.app.domain.EmissionEvidence}.
 */
public interface EmissionEvidenceService {
    /**
     * Save a emissionEvidence.
     *
     * @param emissionEvidenceDTO the entity to save.
     * @return the persisted entity.
     */
    EmissionEvidenceDTO save(EmissionEvidenceDTO emissionEvidenceDTO);

    /**
     * Updates a emissionEvidence.
     *
     * @param emissionEvidenceDTO the entity to update.
     * @return the persisted entity.
     */
    EmissionEvidenceDTO update(EmissionEvidenceDTO emissionEvidenceDTO);

    /**
     * Partially updates a emissionEvidence.
     *
     * @param emissionEvidenceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EmissionEvidenceDTO> partialUpdate(EmissionEvidenceDTO emissionEvidenceDTO);

    /**
     * Get all the emissionEvidences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EmissionEvidenceDTO> findAll(Pageable pageable);

    /**
     * Get one emissionEvidence by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmissionEvidenceDTO> findOne(Long id);

    /**
     * Delete the emissionEvidence by id.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

package com.ecotrack.app.web.rest;

import com.ecotrack.app.domain.EmissionEvidence;
import com.ecotrack.app.repository.EmissionEvidenceRepository;
import com.ecotrack.app.service.EmissionEvidenceService;
import com.ecotrack.app.service.dto.EmissionEvidenceDTO;
import com.ecotrack.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ecotrack.app.domain.EmissionEvidence}.
 */
@RestController
@RequestMapping("/api/emission-evidences")
public class EmissionEvidenceResource {

    private final Logger log = LoggerFactory.getLogger(EmissionEvidenceResource.class);

    private static final String ENTITY_NAME = "emissionEvidence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmissionEvidenceService emissionEvidenceService;

    private final EmissionEvidenceRepository emissionEvidenceRepository;

    public EmissionEvidenceResource(
        EmissionEvidenceService emissionEvidenceService,
        EmissionEvidenceRepository emissionEvidenceRepository
    ) {
        this.emissionEvidenceService = emissionEvidenceService;
        this.emissionEvidenceRepository = emissionEvidenceRepository;
    }

    /**
     * {@code POST  /emission-evidences} : Create a new emissionEvidence.
     *
     * @param emissionEvidenceDTO the emissionEvidenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emissionEvidenceDTO, or with status {@code 400 (Bad Request)} if the emissionEvidence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<EmissionEvidenceDTO> createEmissionEvidence(@RequestBody EmissionEvidenceDTO emissionEvidenceDTO)
        throws URISyntaxException {
        log.debug("REST request to save EmissionEvidence : {}", emissionEvidenceDTO);
        if (emissionEvidenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new emissionEvidence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmissionEvidenceDTO result = emissionEvidenceService.save(emissionEvidenceDTO);
        return ResponseEntity
            .created(new URI("/api/emission-evidences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emission-evidences/:id} : Updates an existing emissionEvidence.
     *
     * @param id the id of the emissionEvidenceDTO to save.
     * @param emissionEvidenceDTO the emissionEvidenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emissionEvidenceDTO,
     * or with status {@code 400 (Bad Request)} if the emissionEvidenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emissionEvidenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmissionEvidenceDTO> updateEmissionEvidence(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EmissionEvidenceDTO emissionEvidenceDTO
    ) throws URISyntaxException {
        log.debug("REST request to update EmissionEvidence : {}, {}", id, emissionEvidenceDTO);
        if (emissionEvidenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, emissionEvidenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!emissionEvidenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EmissionEvidenceDTO result = emissionEvidenceService.update(emissionEvidenceDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emissionEvidenceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /emission-evidences/:id} : Partial updates given fields of an existing emissionEvidence, field will ignore if it is null
     *
     * @param id the id of the emissionEvidenceDTO to save.
     * @param emissionEvidenceDTO the emissionEvidenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emissionEvidenceDTO,
     * or with status {@code 400 (Bad Request)} if the emissionEvidenceDTO is not valid,
     * or with status {@code 404 (Not Found)} if the emissionEvidenceDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the emissionEvidenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EmissionEvidenceDTO> partialUpdateEmissionEvidence(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EmissionEvidenceDTO emissionEvidenceDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update EmissionEvidence partially : {}, {}", id, emissionEvidenceDTO);
        if (emissionEvidenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, emissionEvidenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!emissionEvidenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EmissionEvidenceDTO> result = emissionEvidenceService.partialUpdate(emissionEvidenceDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emissionEvidenceDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /emission-evidences} : get all the emissionEvidences.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emissionEvidences in body.
     */
    @GetMapping("")
    public ResponseEntity<List<EmissionEvidenceDTO>> getAllEmissionEvidences(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of EmissionEvidences");
        Page<EmissionEvidenceDTO> page = emissionEvidenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /emission-evidences/:id} : get the "id" emissionEvidence.
     *
     * @param id the id of the emissionEvidenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emissionEvidenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<EmissionEvidenceDTO> getEmissionEvidence(@PathVariable("id") Long id) {
        log.debug("REST request to get EmissionEvidence : {}", id);
        Optional<EmissionEvidenceDTO> emissionEvidenceDTO = emissionEvidenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(emissionEvidenceDTO);
    }

    /**
     * {@code DELETE  /emission-evidences/:id} : delete the "id" emissionEvidence.
     *
     * @param id the id of the emissionEvidence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmissionEvidence(@PathVariable("id") Long id) {
        log.debug("REST request to delete EmissionEvidence : {}", id);
        emissionEvidenceService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

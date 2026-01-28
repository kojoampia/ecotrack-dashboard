package com.ecotrack.app.web.rest;

import com.ecotrack.app.repository.ProductPassportRepository;
import com.ecotrack.app.service.ProductPassportService;
import com.ecotrack.app.service.dto.ProductPassportDTO;
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
 * REST controller for managing {@link com.ecotrack.app.domain.ProductPassport}.
 */
@RestController
@RequestMapping("/api/product-passports")
public class ProductPassportResource {

    private final Logger log = LoggerFactory.getLogger(ProductPassportResource.class);

    private static final String ENTITY_NAME = "productPassport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductPassportService productPassportService;

    private final ProductPassportRepository productPassportRepository;

    public ProductPassportResource(ProductPassportService productPassportService, ProductPassportRepository productPassportRepository) {
        this.productPassportService = productPassportService;
        this.productPassportRepository = productPassportRepository;
    }

    /**
     * {@code POST  /product-passports} : Create a new productPassport.
     *
     * @param productPassportDTO the productPassportDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productPassportDTO, or with status {@code 400 (Bad Request)} if the productPassport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ProductPassportDTO> createProductPassport(@RequestBody ProductPassportDTO productPassportDTO)
        throws URISyntaxException {
        log.debug("REST request to save ProductPassport : {}", productPassportDTO);
        if (productPassportDTO.getId() != null) {
            throw new BadRequestAlertException("A new productPassport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductPassportDTO result = productPassportService.save(productPassportDTO);
        return ResponseEntity
            .created(new URI("/api/product-passports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-passports/:id} : Updates an existing productPassport.
     *
     * @param id the id of the productPassportDTO to save.
     * @param productPassportDTO the productPassportDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productPassportDTO,
     * or with status {@code 400 (Bad Request)} if the productPassportDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productPassportDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductPassportDTO> updateProductPassport(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProductPassportDTO productPassportDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ProductPassport : {}, {}", id, productPassportDTO);
        if (productPassportDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productPassportDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productPassportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProductPassportDTO result = productPassportService.update(productPassportDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productPassportDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /product-passports/:id} : Partial updates given fields of an existing productPassport, field will ignore if it is null
     *
     * @param id the id of the productPassportDTO to save.
     * @param productPassportDTO the productPassportDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productPassportDTO,
     * or with status {@code 400 (Bad Request)} if the productPassportDTO is not valid,
     * or with status {@code 404 (Not Found)} if the productPassportDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the productPassportDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProductPassportDTO> partialUpdateProductPassport(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProductPassportDTO productPassportDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProductPassport partially : {}, {}", id, productPassportDTO);
        if (productPassportDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productPassportDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productPassportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductPassportDTO> result = productPassportService.partialUpdate(productPassportDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productPassportDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /product-passports} : get all the productPassports.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productPassports in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ProductPassportDTO>> getAllProductPassports(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of ProductPassports");
        Page<ProductPassportDTO> page;
        if (eagerload) {
            page = productPassportService.findAllWithEagerRelationships(pageable);
        } else {
            page = productPassportService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /product-passports/:id} : get the "id" productPassport.
     *
     * @param id the id of the productPassportDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productPassportDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductPassportDTO> getProductPassport(@PathVariable Long id) {
        log.debug("REST request to get ProductPassport : {}", id);
        Optional<ProductPassportDTO> productPassportDTO = productPassportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productPassportDTO);
    }

    /**
     * {@code DELETE  /product-passports/:id} : delete the "id" productPassport.
     *
     * @param id the id of the productPassportDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductPassport(@PathVariable Long id) {
        log.debug("REST request to delete ProductPassport : {}", id);
        productPassportService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

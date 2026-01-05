package com.ecotrack.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecotrack.app.IntegrationTest;
import com.ecotrack.app.domain.EmissionRecord;
import com.ecotrack.app.domain.enumeration.Scope;
import com.ecotrack.app.repository.EmissionRecordRepository;
import com.ecotrack.app.service.EmissionRecordService;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import com.ecotrack.app.service.mapper.EmissionRecordMapper;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EmissionRecordResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class EmissionRecordResourceIT {

    private static final Scope DEFAULT_SCOPE = Scope.SCOPE_1;
    private static final Scope UPDATED_SCOPE = Scope.SCOPE_2;

    private static final Long DEFAULT_CARBON_GRAMS = 1L;
    private static final Long UPDATED_CARBON_GRAMS = 2L;

    private static final LocalDate DEFAULT_DATE_RECORDED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RECORDED = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/emission-records";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EmissionRecordRepository emissionRecordRepository;

    @Mock
    private EmissionRecordRepository emissionRecordRepositoryMock;

    @Autowired
    private EmissionRecordMapper emissionRecordMapper;

    @Mock
    private EmissionRecordService emissionRecordServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmissionRecordMockMvc;

    private EmissionRecord emissionRecord;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmissionRecord createEntity(EntityManager em) {
        EmissionRecord emissionRecord = new EmissionRecord()
            .scope(DEFAULT_SCOPE)
            .carbonGrams(DEFAULT_CARBON_GRAMS)
            .dateRecorded(DEFAULT_DATE_RECORDED)
            .source(DEFAULT_SOURCE);
        return emissionRecord;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmissionRecord createUpdatedEntity(EntityManager em) {
        EmissionRecord emissionRecord = new EmissionRecord()
            .scope(UPDATED_SCOPE)
            .carbonGrams(UPDATED_CARBON_GRAMS)
            .dateRecorded(UPDATED_DATE_RECORDED)
            .source(UPDATED_SOURCE);
        return emissionRecord;
    }

    @BeforeEach
    public void initTest() {
        emissionRecord = createEntity(em);
    }

    @Test
    @Transactional
    void createEmissionRecord() throws Exception {
        int databaseSizeBeforeCreate = emissionRecordRepository.findAll().size();
        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);
        restEmissionRecordMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeCreate + 1);
        EmissionRecord testEmissionRecord = emissionRecordList.get(emissionRecordList.size() - 1);
        assertThat(testEmissionRecord.getScope()).isEqualTo(DEFAULT_SCOPE);
        assertThat(testEmissionRecord.getCarbonGrams()).isEqualTo(DEFAULT_CARBON_GRAMS);
        assertThat(testEmissionRecord.getDateRecorded()).isEqualTo(DEFAULT_DATE_RECORDED);
        assertThat(testEmissionRecord.getSource()).isEqualTo(DEFAULT_SOURCE);
    }

    @Test
    @Transactional
    void createEmissionRecordWithExistingId() throws Exception {
        // Create the EmissionRecord with an existing ID
        emissionRecord.setId(1L);
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        int databaseSizeBeforeCreate = emissionRecordRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmissionRecordMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkScopeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emissionRecordRepository.findAll().size();
        // set the field null
        emissionRecord.setScope(null);

        // Create the EmissionRecord, which fails.
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        restEmissionRecordMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCarbonGramsIsRequired() throws Exception {
        int databaseSizeBeforeTest = emissionRecordRepository.findAll().size();
        // set the field null
        emissionRecord.setCarbonGrams(null);

        // Create the EmissionRecord, which fails.
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        restEmissionRecordMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEmissionRecords() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        // Get all the emissionRecordList
        restEmissionRecordMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emissionRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].scope").value(hasItem(DEFAULT_SCOPE.toString())))
            .andExpect(jsonPath("$.[*].carbonGrams").value(hasItem(DEFAULT_CARBON_GRAMS.intValue())))
            .andExpect(jsonPath("$.[*].dateRecorded").value(hasItem(DEFAULT_DATE_RECORDED.toString())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEmissionRecordsWithEagerRelationshipsIsEnabled() throws Exception {
        when(emissionRecordServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEmissionRecordMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(emissionRecordServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEmissionRecordsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(emissionRecordServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEmissionRecordMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(emissionRecordRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getEmissionRecord() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        // Get the emissionRecord
        restEmissionRecordMockMvc
            .perform(get(ENTITY_API_URL_ID, emissionRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emissionRecord.getId().intValue()))
            .andExpect(jsonPath("$.scope").value(DEFAULT_SCOPE.toString()))
            .andExpect(jsonPath("$.carbonGrams").value(DEFAULT_CARBON_GRAMS.intValue()))
            .andExpect(jsonPath("$.dateRecorded").value(DEFAULT_DATE_RECORDED.toString()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE));
    }

    @Test
    @Transactional
    void getNonExistingEmissionRecord() throws Exception {
        // Get the emissionRecord
        restEmissionRecordMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEmissionRecord() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();

        // Update the emissionRecord
        EmissionRecord updatedEmissionRecord = emissionRecordRepository.findById(emissionRecord.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedEmissionRecord are not directly saved in db
        em.detach(updatedEmissionRecord);
        updatedEmissionRecord
            .scope(UPDATED_SCOPE)
            .carbonGrams(UPDATED_CARBON_GRAMS)
            .dateRecorded(UPDATED_DATE_RECORDED)
            .source(UPDATED_SOURCE);
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(updatedEmissionRecord);

        restEmissionRecordMockMvc
            .perform(
                put(ENTITY_API_URL_ID, emissionRecordDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isOk());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
        EmissionRecord testEmissionRecord = emissionRecordList.get(emissionRecordList.size() - 1);
        assertThat(testEmissionRecord.getScope()).isEqualTo(UPDATED_SCOPE);
        assertThat(testEmissionRecord.getCarbonGrams()).isEqualTo(UPDATED_CARBON_GRAMS);
        assertThat(testEmissionRecord.getDateRecorded()).isEqualTo(UPDATED_DATE_RECORDED);
        assertThat(testEmissionRecord.getSource()).isEqualTo(UPDATED_SOURCE);
    }

    @Test
    @Transactional
    void putNonExistingEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                put(ENTITY_API_URL_ID, emissionRecordDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmissionRecordWithPatch() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();

        // Update the emissionRecord using partial update
        EmissionRecord partialUpdatedEmissionRecord = new EmissionRecord();
        partialUpdatedEmissionRecord.setId(emissionRecord.getId());

        partialUpdatedEmissionRecord.dateRecorded(UPDATED_DATE_RECORDED).source(UPDATED_SOURCE);

        restEmissionRecordMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmissionRecord.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmissionRecord))
            )
            .andExpect(status().isOk());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
        EmissionRecord testEmissionRecord = emissionRecordList.get(emissionRecordList.size() - 1);
        assertThat(testEmissionRecord.getScope()).isEqualTo(DEFAULT_SCOPE);
        assertThat(testEmissionRecord.getCarbonGrams()).isEqualTo(DEFAULT_CARBON_GRAMS);
        assertThat(testEmissionRecord.getDateRecorded()).isEqualTo(UPDATED_DATE_RECORDED);
        assertThat(testEmissionRecord.getSource()).isEqualTo(UPDATED_SOURCE);
    }

    @Test
    @Transactional
    void fullUpdateEmissionRecordWithPatch() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();

        // Update the emissionRecord using partial update
        EmissionRecord partialUpdatedEmissionRecord = new EmissionRecord();
        partialUpdatedEmissionRecord.setId(emissionRecord.getId());

        partialUpdatedEmissionRecord
            .scope(UPDATED_SCOPE)
            .carbonGrams(UPDATED_CARBON_GRAMS)
            .dateRecorded(UPDATED_DATE_RECORDED)
            .source(UPDATED_SOURCE);

        restEmissionRecordMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmissionRecord.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmissionRecord))
            )
            .andExpect(status().isOk());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
        EmissionRecord testEmissionRecord = emissionRecordList.get(emissionRecordList.size() - 1);
        assertThat(testEmissionRecord.getScope()).isEqualTo(UPDATED_SCOPE);
        assertThat(testEmissionRecord.getCarbonGrams()).isEqualTo(UPDATED_CARBON_GRAMS);
        assertThat(testEmissionRecord.getDateRecorded()).isEqualTo(UPDATED_DATE_RECORDED);
        assertThat(testEmissionRecord.getSource()).isEqualTo(UPDATED_SOURCE);
    }

    @Test
    @Transactional
    void patchNonExistingEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, emissionRecordDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmissionRecord() throws Exception {
        int databaseSizeBeforeUpdate = emissionRecordRepository.findAll().size();
        emissionRecord.setId(longCount.incrementAndGet());

        // Create the EmissionRecord
        EmissionRecordDTO emissionRecordDTO = emissionRecordMapper.toDto(emissionRecord);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmissionRecordMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(emissionRecordDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmissionRecord in the database
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmissionRecord() throws Exception {
        // Initialize the database
        emissionRecordRepository.saveAndFlush(emissionRecord);

        int databaseSizeBeforeDelete = emissionRecordRepository.findAll().size();

        // Delete the emissionRecord
        restEmissionRecordMockMvc
            .perform(delete(ENTITY_API_URL_ID, emissionRecord.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmissionRecord> emissionRecordList = emissionRecordRepository.findAll();
        assertThat(emissionRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package com.ecotrack.app.service.impl;

import com.ecotrack.app.domain.EmissionRecord;
import com.ecotrack.app.repository.EmissionRecordRepository;
import com.ecotrack.app.service.EmissionRecordService;
import com.ecotrack.app.service.dto.EmissionRecordDTO;
import com.ecotrack.app.service.mapper.EmissionRecordMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.ecotrack.app.domain.EmissionRecord}.
 */
@Service
@Transactional
public class EmissionRecordServiceImpl implements EmissionRecordService {

    private final Logger log = LoggerFactory.getLogger(EmissionRecordServiceImpl.class);

    private final EmissionRecordRepository emissionRecordRepository;

    private final EmissionRecordMapper emissionRecordMapper;

    public EmissionRecordServiceImpl(EmissionRecordRepository emissionRecordRepository, EmissionRecordMapper emissionRecordMapper) {
        this.emissionRecordRepository = emissionRecordRepository;
        this.emissionRecordMapper = emissionRecordMapper;
    }

    @Override
    public EmissionRecordDTO save(EmissionRecordDTO emissionRecordDTO) {
        log.debug("Request to save EmissionRecord : {}", emissionRecordDTO);
        EmissionRecord emissionRecord = emissionRecordMapper.toEntity(emissionRecordDTO);
        emissionRecord = emissionRecordRepository.save(emissionRecord);
        return emissionRecordMapper.toDto(emissionRecord);
    }

    @Override
    public EmissionRecordDTO update(EmissionRecordDTO emissionRecordDTO) {
        log.debug("Request to update EmissionRecord : {}", emissionRecordDTO);
        EmissionRecord emissionRecord = emissionRecordMapper.toEntity(emissionRecordDTO);
        emissionRecord = emissionRecordRepository.save(emissionRecord);
        return emissionRecordMapper.toDto(emissionRecord);
    }

    @Override
    public Optional<EmissionRecordDTO> partialUpdate(EmissionRecordDTO emissionRecordDTO) {
        log.debug("Request to partially update EmissionRecord : {}", emissionRecordDTO);

        return emissionRecordRepository
            .findById(emissionRecordDTO.getId())
            .map(existingEmissionRecord -> {
                emissionRecordMapper.partialUpdate(existingEmissionRecord, emissionRecordDTO);

                return existingEmissionRecord;
            })
            .map(emissionRecordRepository::save)
            .map(emissionRecordMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmissionRecordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EmissionRecords");
        return emissionRecordRepository.findAll(pageable).map(emissionRecordMapper::toDto);
    }

    public Page<EmissionRecordDTO> findAllWithEagerRelationships(Pageable pageable) {
        return emissionRecordRepository.findAllWithEagerRelationships(pageable).map(emissionRecordMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EmissionRecordDTO> findOne(Long id) {
        log.debug("Request to get EmissionRecord : {}", id);
        return emissionRecordRepository.findOneWithEagerRelationships(id).map(emissionRecordMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmissionRecord : {}", id);
        emissionRecordRepository.deleteById(id);
    }
}

package com.ecotrack.app.repository;

import com.ecotrack.app.domain.EmissionEvidence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EmissionEvidence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmissionEvidenceRepository extends JpaRepository<EmissionEvidence, Long> {}

package com.ecotrack.app.repository;

import com.ecotrack.app.domain.AuditTrail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AuditTrail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditTrailRepository extends JpaRepository<AuditTrail, Long> {}

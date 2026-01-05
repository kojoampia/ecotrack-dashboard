package com.ecotrack.app.repository;

import com.ecotrack.app.domain.EmissionRecord;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EmissionRecord entity.
 */
@Repository
public interface EmissionRecordRepository extends JpaRepository<EmissionRecord, Long> {
    default Optional<EmissionRecord> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<EmissionRecord> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<EmissionRecord> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select emissionRecord from EmissionRecord emissionRecord left join fetch emissionRecord.product",
        countQuery = "select count(emissionRecord) from EmissionRecord emissionRecord"
    )
    Page<EmissionRecord> findAllWithToOneRelationships(Pageable pageable);

    @Query("select emissionRecord from EmissionRecord emissionRecord left join fetch emissionRecord.product")
    List<EmissionRecord> findAllWithToOneRelationships();

    @Query("select emissionRecord from EmissionRecord emissionRecord left join fetch emissionRecord.product where emissionRecord.id =:id")
    Optional<EmissionRecord> findOneWithToOneRelationships(@Param("id") Long id);
}

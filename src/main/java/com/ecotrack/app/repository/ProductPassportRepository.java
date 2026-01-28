package com.ecotrack.app.repository;

import com.ecotrack.app.domain.ProductPassport;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ProductPassport entity.
 */
@Repository
public interface ProductPassportRepository extends JpaRepository<ProductPassport, Long> {
    default Optional<ProductPassport> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ProductPassport> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ProductPassport> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select productPassport from ProductPassport productPassport left join fetch productPassport.product",
        countQuery = "select count(productPassport) from ProductPassport productPassport"
    )
    Page<ProductPassport> findAllWithToOneRelationships(Pageable pageable);

    @Query("select productPassport from ProductPassport productPassport left join fetch productPassport.product")
    List<ProductPassport> findAllWithToOneRelationships();

    @Query(
        "select productPassport from ProductPassport productPassport left join fetch productPassport.product where productPassport.id =:id"
    )
    Optional<ProductPassport> findOneWithToOneRelationships(@Param("id") Long id);
}

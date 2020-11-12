package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Cargos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cargos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CargosRepository extends JpaRepository<Cargos, Long> {
}

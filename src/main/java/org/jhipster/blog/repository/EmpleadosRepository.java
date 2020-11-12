package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Empleados;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Empleados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadosRepository extends JpaRepository<Empleados, Long> {
}

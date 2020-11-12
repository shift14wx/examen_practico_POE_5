package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Sucursales;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Sucursales entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SucursalesRepository extends JpaRepository<Sucursales, Long> {
}

package org.jhipster.blog.web.rest;

import org.jhipster.blog.domain.Sucursales;
import org.jhipster.blog.repository.SucursalesRepository;
import org.jhipster.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.blog.domain.Sucursales}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SucursalesResource {

    private final Logger log = LoggerFactory.getLogger(SucursalesResource.class);

    private static final String ENTITY_NAME = "sucursales";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SucursalesRepository sucursalesRepository;

    public SucursalesResource(SucursalesRepository sucursalesRepository) {
        this.sucursalesRepository = sucursalesRepository;
    }

    /**
     * {@code POST  /sucursales} : Create a new sucursales.
     *
     * @param sucursales the sucursales to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sucursales, or with status {@code 400 (Bad Request)} if the sucursales has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sucursales")
    public ResponseEntity<Sucursales> createSucursales(@RequestBody Sucursales sucursales) throws URISyntaxException {
        log.debug("REST request to save Sucursales : {}", sucursales);
        if (sucursales.getId() != null) {
            throw new BadRequestAlertException("A new sucursales cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sucursales result = sucursalesRepository.save(sucursales);
        return ResponseEntity.created(new URI("/api/sucursales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sucursales} : Updates an existing sucursales.
     *
     * @param sucursales the sucursales to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursales,
     * or with status {@code 400 (Bad Request)} if the sucursales is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sucursales couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sucursales")
    public ResponseEntity<Sucursales> updateSucursales(@RequestBody Sucursales sucursales) throws URISyntaxException {
        log.debug("REST request to update Sucursales : {}", sucursales);
        if (sucursales.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sucursales result = sucursalesRepository.save(sucursales);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sucursales.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sucursales} : get all the sucursales.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sucursales in body.
     */
    @GetMapping("/sucursales")
    public List<Sucursales> getAllSucursales() {
        log.debug("REST request to get all Sucursales");
        return sucursalesRepository.findAll();
    }

    /**
     * {@code GET  /sucursales/:id} : get the "id" sucursales.
     *
     * @param id the id of the sucursales to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sucursales, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sucursales/{id}")
    public ResponseEntity<Sucursales> getSucursales(@PathVariable Long id) {
        log.debug("REST request to get Sucursales : {}", id);
        Optional<Sucursales> sucursales = sucursalesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sucursales);
    }

    /**
     * {@code DELETE  /sucursales/:id} : delete the "id" sucursales.
     *
     * @param id the id of the sucursales to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sucursales/{id}")
    public ResponseEntity<Void> deleteSucursales(@PathVariable Long id) {
        log.debug("REST request to delete Sucursales : {}", id);
        sucursalesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

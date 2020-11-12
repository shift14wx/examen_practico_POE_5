package org.jhipster.blog.web.rest;

import org.jhipster.blog.domain.Cargos;
import org.jhipster.blog.repository.CargosRepository;
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
 * REST controller for managing {@link org.jhipster.blog.domain.Cargos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CargosResource {

    private final Logger log = LoggerFactory.getLogger(CargosResource.class);

    private static final String ENTITY_NAME = "cargos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CargosRepository cargosRepository;

    public CargosResource(CargosRepository cargosRepository) {
        this.cargosRepository = cargosRepository;
    }

    /**
     * {@code POST  /cargos} : Create a new cargos.
     *
     * @param cargos the cargos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cargos, or with status {@code 400 (Bad Request)} if the cargos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cargos")
    public ResponseEntity<Cargos> createCargos(@RequestBody Cargos cargos) throws URISyntaxException {
        log.debug("REST request to save Cargos : {}", cargos);
        if (cargos.getId() != null) {
            throw new BadRequestAlertException("A new cargos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cargos result = cargosRepository.save(cargos);
        return ResponseEntity.created(new URI("/api/cargos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cargos} : Updates an existing cargos.
     *
     * @param cargos the cargos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cargos,
     * or with status {@code 400 (Bad Request)} if the cargos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cargos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cargos")
    public ResponseEntity<Cargos> updateCargos(@RequestBody Cargos cargos) throws URISyntaxException {
        log.debug("REST request to update Cargos : {}", cargos);
        if (cargos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cargos result = cargosRepository.save(cargos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cargos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cargos} : get all the cargos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cargos in body.
     */
    @GetMapping("/cargos")
    public List<Cargos> getAllCargos() {
        log.debug("REST request to get all Cargos");
        return cargosRepository.findAll();
    }

    /**
     * {@code GET  /cargos/:id} : get the "id" cargos.
     *
     * @param id the id of the cargos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cargos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cargos/{id}")
    public ResponseEntity<Cargos> getCargos(@PathVariable Long id) {
        log.debug("REST request to get Cargos : {}", id);
        Optional<Cargos> cargos = cargosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cargos);
    }

    /**
     * {@code DELETE  /cargos/:id} : delete the "id" cargos.
     *
     * @param id the id of the cargos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cargos/{id}")
    public ResponseEntity<Void> deleteCargos(@PathVariable Long id) {
        log.debug("REST request to delete Cargos : {}", id);
        cargosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

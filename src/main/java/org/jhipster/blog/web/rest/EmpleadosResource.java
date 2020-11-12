package org.jhipster.blog.web.rest;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import org.jhipster.blog.domain.Empleados;
import org.jhipster.blog.repository.EmpleadosRepository;
import org.jhipster.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.jsonwebtoken.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * REST controller for managing {@link org.jhipster.blog.domain.Empleados}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmpleadosResource {

    private final Logger log = LoggerFactory.getLogger(EmpleadosResource.class);

    private static final String ENTITY_NAME = "empleados";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmpleadosRepository empleadosRepository;

    public EmpleadosResource(EmpleadosRepository empleadosRepository) {
        this.empleadosRepository = empleadosRepository;
    }

    /**
     * {@code POST  /empleados} : Create a new empleados.
     *
     * @param empleados the empleados to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new empleados, or with status {@code 400 (Bad Request)} if the empleados has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/empleados")
    public ResponseEntity<Empleados> createEmpleados(@RequestBody Empleados empleados) throws URISyntaxException {
        log.debug("REST request to save Empleados : {}", empleados);
        if (empleados.getId() != null) {
            throw new BadRequestAlertException("A new empleados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empleados result = empleadosRepository.save(empleados);
        return ResponseEntity.created(new URI("/api/empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /empleados} : Updates an existing empleados.
     *
     * @param empleados the empleados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated empleados,
     * or with status {@code 400 (Bad Request)} if the empleados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the empleados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/empleados")
    public ResponseEntity<Empleados> updateEmpleados(@RequestBody Empleados empleados) throws URISyntaxException {
        log.debug("REST request to update Empleados : {}", empleados);
        if (empleados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empleados result = empleadosRepository.save(empleados);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, empleados.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /empleados} : get all the empleados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of empleados in body.
     */
    @GetMapping("/empleados")
    public List<Empleados> getAllEmpleados() {
        log.debug("REST request to get all Empleados");
        return empleadosRepository.findAll();
    }

    /**
     * {@code GET  /empleados/:id} : get the "id" empleados.
     *
     * @param id the id of the empleados to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the empleados, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleados> getEmpleados(@PathVariable Long id) {
        log.debug("REST request to get Empleados : {}", id);
        Optional<Empleados> empleados = empleadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(empleados);
    }

    /**
     * {@code DELETE  /empleados/:id} : delete the "id" empleados.
     *
     * @param id the id of the empleados to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Void> deleteEmpleados(@PathVariable Long id) {
        log.debug("REST request to delete Empleados : {}", id);
        empleadosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/empleados/report")
    public void empleadosReport(HttpServletResponse response) throws FileNotFoundException, JRException, IOException,IllegalStateException {

        File file  = ResourceUtils.getFile("classpath:empleados.jrxml");

        JasperReport jasperReport  = JasperCompileManager.compileReport(file.getAbsolutePath());
        System.out.println("doing");
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(empleadosRepository.findAll());
        HashMap<String,Object> parameters =new HashMap<String, Object>();

        parameters.put("createdBy", "Empleados");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

         final String filePath = "\\";
        JasperExportManager.exportReportToPdfFile(jasperPrint, filePath + "Employee_report.pdf");

        response.setContentType("application/x-download");
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"users.pdf\""));

       try {
        OutputStream out = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, out);
       } catch (Exception e) {
           //TODO: handle exception
       } 
    }
}

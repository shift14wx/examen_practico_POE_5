package org.jhipster.blog.web.rest;

import org.jhipster.blog.ExamenpracticocincoApp;
import org.jhipster.blog.domain.Sucursales;
import org.jhipster.blog.repository.SucursalesRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SucursalesResource} REST controller.
 */
@SpringBootTest(classes = ExamenpracticocincoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SucursalesResourceIT {

    private static final String DEFAULT_SUCURSAL = "AAAAAAAAAA";
    private static final String UPDATED_SUCURSAL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    @Autowired
    private SucursalesRepository sucursalesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSucursalesMockMvc;

    private Sucursales sucursales;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursales createEntity(EntityManager em) {
        Sucursales sucursales = new Sucursales()
            .sucursal(DEFAULT_SUCURSAL)
            .telefono(DEFAULT_TELEFONO);
        return sucursales;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursales createUpdatedEntity(EntityManager em) {
        Sucursales sucursales = new Sucursales()
            .sucursal(UPDATED_SUCURSAL)
            .telefono(UPDATED_TELEFONO);
        return sucursales;
    }

    @BeforeEach
    public void initTest() {
        sucursales = createEntity(em);
    }

    @Test
    @Transactional
    public void createSucursales() throws Exception {
        int databaseSizeBeforeCreate = sucursalesRepository.findAll().size();
        // Create the Sucursales
        restSucursalesMockMvc.perform(post("/api/sucursales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursales)))
            .andExpect(status().isCreated());

        // Validate the Sucursales in the database
        List<Sucursales> sucursalesList = sucursalesRepository.findAll();
        assertThat(sucursalesList).hasSize(databaseSizeBeforeCreate + 1);
        Sucursales testSucursales = sucursalesList.get(sucursalesList.size() - 1);
        assertThat(testSucursales.getSucursal()).isEqualTo(DEFAULT_SUCURSAL);
        assertThat(testSucursales.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
    }

    @Test
    @Transactional
    public void createSucursalesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sucursalesRepository.findAll().size();

        // Create the Sucursales with an existing ID
        sucursales.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSucursalesMockMvc.perform(post("/api/sucursales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursales)))
            .andExpect(status().isBadRequest());

        // Validate the Sucursales in the database
        List<Sucursales> sucursalesList = sucursalesRepository.findAll();
        assertThat(sucursalesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSucursales() throws Exception {
        // Initialize the database
        sucursalesRepository.saveAndFlush(sucursales);

        // Get all the sucursalesList
        restSucursalesMockMvc.perform(get("/api/sucursales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sucursales.getId().intValue())))
            .andExpect(jsonPath("$.[*].sucursal").value(hasItem(DEFAULT_SUCURSAL)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)));
    }
    
    @Test
    @Transactional
    public void getSucursales() throws Exception {
        // Initialize the database
        sucursalesRepository.saveAndFlush(sucursales);

        // Get the sucursales
        restSucursalesMockMvc.perform(get("/api/sucursales/{id}", sucursales.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sucursales.getId().intValue()))
            .andExpect(jsonPath("$.sucursal").value(DEFAULT_SUCURSAL))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO));
    }
    @Test
    @Transactional
    public void getNonExistingSucursales() throws Exception {
        // Get the sucursales
        restSucursalesMockMvc.perform(get("/api/sucursales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSucursales() throws Exception {
        // Initialize the database
        sucursalesRepository.saveAndFlush(sucursales);

        int databaseSizeBeforeUpdate = sucursalesRepository.findAll().size();

        // Update the sucursales
        Sucursales updatedSucursales = sucursalesRepository.findById(sucursales.getId()).get();
        // Disconnect from session so that the updates on updatedSucursales are not directly saved in db
        em.detach(updatedSucursales);
        updatedSucursales
            .sucursal(UPDATED_SUCURSAL)
            .telefono(UPDATED_TELEFONO);

        restSucursalesMockMvc.perform(put("/api/sucursales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSucursales)))
            .andExpect(status().isOk());

        // Validate the Sucursales in the database
        List<Sucursales> sucursalesList = sucursalesRepository.findAll();
        assertThat(sucursalesList).hasSize(databaseSizeBeforeUpdate);
        Sucursales testSucursales = sucursalesList.get(sucursalesList.size() - 1);
        assertThat(testSucursales.getSucursal()).isEqualTo(UPDATED_SUCURSAL);
        assertThat(testSucursales.getTelefono()).isEqualTo(UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void updateNonExistingSucursales() throws Exception {
        int databaseSizeBeforeUpdate = sucursalesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSucursalesMockMvc.perform(put("/api/sucursales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursales)))
            .andExpect(status().isBadRequest());

        // Validate the Sucursales in the database
        List<Sucursales> sucursalesList = sucursalesRepository.findAll();
        assertThat(sucursalesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSucursales() throws Exception {
        // Initialize the database
        sucursalesRepository.saveAndFlush(sucursales);

        int databaseSizeBeforeDelete = sucursalesRepository.findAll().size();

        // Delete the sucursales
        restSucursalesMockMvc.perform(delete("/api/sucursales/{id}", sucursales.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sucursales> sucursalesList = sucursalesRepository.findAll();
        assertThat(sucursalesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

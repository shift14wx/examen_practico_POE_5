package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Empleados.
 */
@Entity
@Table(name = "empleados")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empleados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "sueldo")
    private Double sueldo;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Cargos cargos;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Sucursales sucursales;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Empleados nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public Empleados telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Double getSueldo() {
        return sueldo;
    }

    public Empleados sueldo(Double sueldo) {
        this.sueldo = sueldo;
        return this;
    }

    public void setSueldo(Double sueldo) {
        this.sueldo = sueldo;
    }

    public Cargos getCargos() {
        return cargos;
    }

    public Empleados cargos(Cargos cargos) {
        this.cargos = cargos;
        return this;
    }

    public void setCargos(Cargos cargos) {
        this.cargos = cargos;
    }

    public Sucursales getSucursales() {
        return sucursales;
    }

    public Empleados sucursales(Sucursales sucursales) {
        this.sucursales = sucursales;
        return this;
    }

    public void setSucursales(Sucursales sucursales) {
        this.sucursales = sucursales;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleados)) {
            return false;
        }
        return id != null && id.equals(((Empleados) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleados{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", sueldo=" + getSueldo() +
            "}";
    }
}

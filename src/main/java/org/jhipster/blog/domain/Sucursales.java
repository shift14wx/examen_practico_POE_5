package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sucursales.
 */
@Entity
@Table(name = "sucursales")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sucursales implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sucursal")
    private String sucursal;

    @Column(name = "telefono")
    private String telefono;

    @OneToMany(mappedBy = "sucursales")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Empleados> empleados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSucursal() {
        return sucursal;
    }

    public Sucursales sucursal(String sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    public String getTelefono() {
        return telefono;
    }

    public Sucursales telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Set<Empleados> getEmpleados() {
        return empleados;
    }

    public Sucursales empleados(Set<Empleados> empleados) {
        this.empleados = empleados;
        return this;
    }

    public Sucursales addEmpleados(Empleados empleados) {
        this.empleados.add(empleados);
        empleados.setSucursales(this);
        return this;
    }

    public Sucursales removeEmpleados(Empleados empleados) {
        this.empleados.remove(empleados);
        empleados.setSucursales(null);
        return this;
    }

    public void setEmpleados(Set<Empleados> empleados) {
        this.empleados = empleados;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sucursales)) {
            return false;
        }
        return id != null && id.equals(((Sucursales) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sucursales{" +
            "id=" + getId() +
            ", sucursal='" + getSucursal() + "'" +
            ", telefono='" + getTelefono() + "'" +
            "}";
    }
}

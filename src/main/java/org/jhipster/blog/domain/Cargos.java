package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cargos.
 */
@Entity
@Table(name = "cargos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cargos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cargo")
    private String cargo;

    @OneToMany(mappedBy = "cargos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Empleados> empleados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCargo() {
        return cargo;
    }

    public Cargos cargo(String cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Set<Empleados> getEmpleados() {
        return empleados;
    }

    public Cargos empleados(Set<Empleados> empleados) {
        this.empleados = empleados;
        return this;
    }

    public Cargos addEmpleados(Empleados empleados) {
        this.empleados.add(empleados);
        empleados.setCargos(this);
        return this;
    }

    public Cargos removeEmpleados(Empleados empleados) {
        this.empleados.remove(empleados);
        empleados.setCargos(null);
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
        if (!(o instanceof Cargos)) {
            return false;
        }
        return id != null && id.equals(((Cargos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cargos{" +
            "id=" + getId() +
            ", cargo='" + getCargo() + "'" +
            "}";
    }
}

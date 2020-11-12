<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="empleados">
                <h2 class="jh-entity-heading"><span v-text="$t('examenpracticocincoApp.empleados.detail.title')">Empleados</span> {{empleados.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.empleados.nombre')">Nombre</span>
                    </dt>
                    <dd>
                        <span>{{empleados.nombre}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.empleados.telefono')">Telefono</span>
                    </dt>
                    <dd>
                        <span>{{empleados.telefono}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.empleados.sueldo')">Sueldo</span>
                    </dt>
                    <dd>
                        <span>{{empleados.sueldo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.empleados.cargos')">Cargos</span>
                    </dt>
                    <dd>
                        <div v-if="empleados.cargos">
                            <router-link :to="{name: 'CargosView', params: {cargosId: empleados.cargos.id}}">{{empleados.cargos.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.empleados.sucursales')">Sucursales</span>
                    </dt>
                    <dd>
                        <div v-if="empleados.sucursales">
                            <router-link :to="{name: 'SucursalesView', params: {sucursalesId: empleados.sucursales.id}}">{{empleados.sucursales.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="empleados.id" :to="{name: 'EmpleadosEdit', params: {empleadosId: empleados.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./empleados-details.component.ts">
</script>

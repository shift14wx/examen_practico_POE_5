<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('examenpracticocincoApp.empleados.home.title')" id="empleados-heading">Empleados</span>
<a  href="/api/empleados/report" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-empleados">
                <font-awesome-icon icon="file-pdf"></font-awesome-icon>
                <span>
                    Imprimir reporte
                </span>
            </a>
            &nbsp;
            <router-link :to="{name: 'EmpleadosCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-empleados">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('examenpracticocincoApp.empleados.home.createLabel')">
                    Create a new Empleados
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && empleados && empleados.length === 0">
            <span v-text="$t('examenpracticocincoApp.empleados.home.notFound')">No empleados found</span>
        </div>
        <div class="table-responsive" v-if="empleados && empleados.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.empleados.nombre')">Nombre</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.empleados.telefono')">Telefono</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.empleados.sueldo')">Sueldo</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.empleados.cargos')">Cargos</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.empleados.sucursales')">Sucursales</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="empleados in empleados"
                    :key="empleados.id">
                    <td>
                        <router-link :to="{name: 'EmpleadosView', params: {empleadosId: empleados.id}}">{{empleados.id}}</router-link>
                    </td>
                    <td>{{empleados.nombre}}</td>
                    <td>{{empleados.telefono}}</td>
                    <td>{{empleados.sueldo}}</td>
                    <td>
                        <div v-if="empleados.cargos">
                            <router-link :to="{name: 'CargosView', params: {cargosId: empleados.cargos.id}}">{{empleados.cargos.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="empleados.sucursales">
                            <router-link :to="{name: 'SucursalesView', params: {sucursalesId: empleados.sucursales.id}}">{{empleados.sucursales.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmpleadosView', params: {empleadosId: empleados.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EmpleadosEdit', params: {empleadosId: empleados.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(empleados)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="examenpracticocincoApp.empleados.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-empleados-heading" v-text="$t('examenpracticocincoApp.empleados.delete.question', {'id': removeId})">Are you sure you want to delete this Empleados?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-empleados" v-text="$t('entity.action.delete')" v-on:click="removeEmpleados()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./empleados.component.ts">
</script>

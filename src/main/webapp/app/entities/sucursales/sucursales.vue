<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('examenpracticocincoApp.sucursales.home.title')" id="sucursales-heading">Sucursales</span>
            <router-link :to="{name: 'SucursalesCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-sucursales">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('examenpracticocincoApp.sucursales.home.createLabel')">
                    Create a new Sucursales
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
        <div class="alert alert-warning" v-if="!isFetching && sucursales && sucursales.length === 0">
            <span v-text="$t('examenpracticocincoApp.sucursales.home.notFound')">No sucursales found</span>
        </div>
        <div class="table-responsive" v-if="sucursales && sucursales.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.sucursales.sucursal')">Sucursal</span></th>
                    <th><span v-text="$t('examenpracticocincoApp.sucursales.telefono')">Telefono</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="sucursales in sucursales"
                    :key="sucursales.id">
                    <td>
                        <router-link :to="{name: 'SucursalesView', params: {sucursalesId: sucursales.id}}">{{sucursales.id}}</router-link>
                    </td>
                    <td>{{sucursales.sucursal}}</td>
                    <td>{{sucursales.telefono}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'SucursalesView', params: {sucursalesId: sucursales.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'SucursalesEdit', params: {sucursalesId: sucursales.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(sucursales)"
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
            <span slot="modal-title"><span id="examenpracticocincoApp.sucursales.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-sucursales-heading" v-text="$t('examenpracticocincoApp.sucursales.delete.question', {'id': removeId})">Are you sure you want to delete this Sucursales?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-sucursales" v-text="$t('entity.action.delete')" v-on:click="removeSucursales()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./sucursales.component.ts">
</script>

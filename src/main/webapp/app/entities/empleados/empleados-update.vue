<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="examenpracticocincoApp.empleados.home.createOrEditLabel" v-text="$t('examenpracticocincoApp.empleados.home.createOrEditLabel')">Create or edit a Empleados</h2>
                <div>
                    <div class="form-group" v-if="empleados.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="empleados.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.empleados.nombre')" for="empleados-nombre">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="empleados-nombre"
                            :class="{'valid': !$v.empleados.nombre.$invalid, 'invalid': $v.empleados.nombre.$invalid }" v-model="$v.empleados.nombre.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.empleados.telefono')" for="empleados-telefono">Telefono</label>
                        <input type="text" class="form-control" name="telefono" id="empleados-telefono"
                            :class="{'valid': !$v.empleados.telefono.$invalid, 'invalid': $v.empleados.telefono.$invalid }" v-model="$v.empleados.telefono.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.empleados.sueldo')" for="empleados-sueldo">Sueldo</label>
                        <input type="number" class="form-control" name="sueldo" id="empleados-sueldo"
                            :class="{'valid': !$v.empleados.sueldo.$invalid, 'invalid': $v.empleados.sueldo.$invalid }" v-model.number="$v.empleados.sueldo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.empleados.cargos')" for="empleados-cargos">Cargos</label>
                        <select class="form-control" id="empleados-cargos" name="cargos" v-model="empleados.cargos">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="empleados.cargos && cargosOption.id === empleados.cargos.id ? empleados.cargos : cargosOption" v-for="cargosOption in cargos" :key="cargosOption.id">{{cargosOption.id + "-) "+cargosOption.cargo}}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.empleados.sucursales')" for="empleados-sucursales">Sucursales</label>
                        <select class="form-control" id="empleados-sucursales" name="sucursales" v-model="empleados.sucursales">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="empleados.sucursales && sucursalesOption.id === empleados.sucursales.id ? empleados.sucursales : sucursalesOption" v-for="sucursalesOption in sucursales" :key="sucursalesOption.id">{{sucursalesOption.id+"-) "+sucursalesOption.sucursal}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.empleados.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./empleados-update.component.ts">
</script>

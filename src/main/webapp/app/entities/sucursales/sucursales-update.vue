<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="examenpracticocincoApp.sucursales.home.createOrEditLabel" v-text="$t('examenpracticocincoApp.sucursales.home.createOrEditLabel')">Create or edit a Sucursales</h2>
                <div>
                    <div class="form-group" v-if="sucursales.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="sucursales.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.sucursales.sucursal')" for="sucursales-sucursal">Sucursal</label>
                        <input type="text" class="form-control" name="sucursal" id="sucursales-sucursal"
                            :class="{'valid': !$v.sucursales.sucursal.$invalid, 'invalid': $v.sucursales.sucursal.$invalid }" v-model="$v.sucursales.sucursal.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('examenpracticocincoApp.sucursales.telefono')" for="sucursales-telefono">Telefono</label>
                        <input type="text" class="form-control" name="telefono" id="sucursales-telefono"
                            :class="{'valid': !$v.sucursales.telefono.$invalid, 'invalid': $v.sucursales.telefono.$invalid }" v-model="$v.sucursales.telefono.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.sucursales.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./sucursales-update.component.ts">
</script>

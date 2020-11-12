<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="cargos">
                <h2 class="jh-entity-heading"><span v-text="$t('examenpracticocincoApp.cargos.detail.title')">Cargos</span> {{cargos.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('examenpracticocincoApp.cargos.cargo')">Cargo</span>
                    </dt>
                    <dd>
                        <span>{{cargos.cargo}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="cargos.id" :to="{name: 'CargosEdit', params: {cargosId: cargos.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./cargos-details.component.ts">
</script>

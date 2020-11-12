/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import CargosUpdateComponent from '@/entities/cargos/cargos-update.vue';
import CargosClass from '@/entities/cargos/cargos-update.component';
import CargosService from '@/entities/cargos/cargos.service';

import EmpleadosService from '@/entities/empleados/empleados.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Cargos Management Update Component', () => {
    let wrapper: Wrapper<CargosClass>;
    let comp: CargosClass;
    let cargosServiceStub: SinonStubbedInstance<CargosService>;

    beforeEach(() => {
      cargosServiceStub = sinon.createStubInstance<CargosService>(CargosService);

      wrapper = shallowMount<CargosClass>(CargosUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          cargosService: () => cargosServiceStub,

          empleadosService: () => new EmpleadosService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.cargos = entity;
        cargosServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cargosServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.cargos = entity;
        cargosServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cargosServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});

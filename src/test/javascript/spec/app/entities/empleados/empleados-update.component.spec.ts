/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EmpleadosUpdateComponent from '@/entities/empleados/empleados-update.vue';
import EmpleadosClass from '@/entities/empleados/empleados-update.component';
import EmpleadosService from '@/entities/empleados/empleados.service';

import CargosService from '@/entities/cargos/cargos.service';

import SucursalesService from '@/entities/sucursales/sucursales.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Empleados Management Update Component', () => {
    let wrapper: Wrapper<EmpleadosClass>;
    let comp: EmpleadosClass;
    let empleadosServiceStub: SinonStubbedInstance<EmpleadosService>;

    beforeEach(() => {
      empleadosServiceStub = sinon.createStubInstance<EmpleadosService>(EmpleadosService);

      wrapper = shallowMount<EmpleadosClass>(EmpleadosUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          empleadosService: () => empleadosServiceStub,

          cargosService: () => new CargosService(),

          sucursalesService: () => new SucursalesService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.empleados = entity;
        empleadosServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(empleadosServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.empleados = entity;
        empleadosServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(empleadosServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import SucursalesUpdateComponent from '@/entities/sucursales/sucursales-update.vue';
import SucursalesClass from '@/entities/sucursales/sucursales-update.component';
import SucursalesService from '@/entities/sucursales/sucursales.service';

import EmpleadosService from '@/entities/empleados/empleados.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Sucursales Management Update Component', () => {
    let wrapper: Wrapper<SucursalesClass>;
    let comp: SucursalesClass;
    let sucursalesServiceStub: SinonStubbedInstance<SucursalesService>;

    beforeEach(() => {
      sucursalesServiceStub = sinon.createStubInstance<SucursalesService>(SucursalesService);

      wrapper = shallowMount<SucursalesClass>(SucursalesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          sucursalesService: () => sucursalesServiceStub,

          empleadosService: () => new EmpleadosService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.sucursales = entity;
        sucursalesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(sucursalesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.sucursales = entity;
        sucursalesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(sucursalesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EmpleadosComponent from '@/entities/empleados/empleados.vue';
import EmpleadosClass from '@/entities/empleados/empleados.component';
import EmpleadosService from '@/entities/empleados/empleados.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Empleados Management Component', () => {
    let wrapper: Wrapper<EmpleadosClass>;
    let comp: EmpleadosClass;
    let empleadosServiceStub: SinonStubbedInstance<EmpleadosService>;

    beforeEach(() => {
      empleadosServiceStub = sinon.createStubInstance<EmpleadosService>(EmpleadosService);
      empleadosServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EmpleadosClass>(EmpleadosComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          empleadosService: () => empleadosServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      empleadosServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEmpleadoss();
      await comp.$nextTick();

      // THEN
      expect(empleadosServiceStub.retrieve.called).toBeTruthy();
      expect(comp.empleados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      empleadosServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEmpleados();
      await comp.$nextTick();

      // THEN
      expect(empleadosServiceStub.delete.called).toBeTruthy();
      expect(empleadosServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

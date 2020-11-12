/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EmpleadosDetailComponent from '@/entities/empleados/empleados-details.vue';
import EmpleadosClass from '@/entities/empleados/empleados-details.component';
import EmpleadosService from '@/entities/empleados/empleados.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Empleados Management Detail Component', () => {
    let wrapper: Wrapper<EmpleadosClass>;
    let comp: EmpleadosClass;
    let empleadosServiceStub: SinonStubbedInstance<EmpleadosService>;

    beforeEach(() => {
      empleadosServiceStub = sinon.createStubInstance<EmpleadosService>(EmpleadosService);

      wrapper = shallowMount<EmpleadosClass>(EmpleadosDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { empleadosService: () => empleadosServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEmpleados = { id: 123 };
        empleadosServiceStub.find.resolves(foundEmpleados);

        // WHEN
        comp.retrieveEmpleados(123);
        await comp.$nextTick();

        // THEN
        expect(comp.empleados).toBe(foundEmpleados);
      });
    });
  });
});

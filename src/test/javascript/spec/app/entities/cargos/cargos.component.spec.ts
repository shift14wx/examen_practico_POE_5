/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import CargosComponent from '@/entities/cargos/cargos.vue';
import CargosClass from '@/entities/cargos/cargos.component';
import CargosService from '@/entities/cargos/cargos.service';

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
  describe('Cargos Management Component', () => {
    let wrapper: Wrapper<CargosClass>;
    let comp: CargosClass;
    let cargosServiceStub: SinonStubbedInstance<CargosService>;

    beforeEach(() => {
      cargosServiceStub = sinon.createStubInstance<CargosService>(CargosService);
      cargosServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CargosClass>(CargosComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          cargosService: () => cargosServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      cargosServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCargoss();
      await comp.$nextTick();

      // THEN
      expect(cargosServiceStub.retrieve.called).toBeTruthy();
      expect(comp.cargos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      cargosServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCargos();
      await comp.$nextTick();

      // THEN
      expect(cargosServiceStub.delete.called).toBeTruthy();
      expect(cargosServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

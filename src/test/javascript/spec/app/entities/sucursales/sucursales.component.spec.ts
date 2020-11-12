/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import SucursalesComponent from '@/entities/sucursales/sucursales.vue';
import SucursalesClass from '@/entities/sucursales/sucursales.component';
import SucursalesService from '@/entities/sucursales/sucursales.service';

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
  describe('Sucursales Management Component', () => {
    let wrapper: Wrapper<SucursalesClass>;
    let comp: SucursalesClass;
    let sucursalesServiceStub: SinonStubbedInstance<SucursalesService>;

    beforeEach(() => {
      sucursalesServiceStub = sinon.createStubInstance<SucursalesService>(SucursalesService);
      sucursalesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<SucursalesClass>(SucursalesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          sucursalesService: () => sucursalesServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      sucursalesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllSucursaless();
      await comp.$nextTick();

      // THEN
      expect(sucursalesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.sucursales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      sucursalesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeSucursales();
      await comp.$nextTick();

      // THEN
      expect(sucursalesServiceStub.delete.called).toBeTruthy();
      expect(sucursalesServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

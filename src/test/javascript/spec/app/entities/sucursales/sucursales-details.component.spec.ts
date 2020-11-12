/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SucursalesDetailComponent from '@/entities/sucursales/sucursales-details.vue';
import SucursalesClass from '@/entities/sucursales/sucursales-details.component';
import SucursalesService from '@/entities/sucursales/sucursales.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Sucursales Management Detail Component', () => {
    let wrapper: Wrapper<SucursalesClass>;
    let comp: SucursalesClass;
    let sucursalesServiceStub: SinonStubbedInstance<SucursalesService>;

    beforeEach(() => {
      sucursalesServiceStub = sinon.createStubInstance<SucursalesService>(SucursalesService);

      wrapper = shallowMount<SucursalesClass>(SucursalesDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { sucursalesService: () => sucursalesServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSucursales = { id: 123 };
        sucursalesServiceStub.find.resolves(foundSucursales);

        // WHEN
        comp.retrieveSucursales(123);
        await comp.$nextTick();

        // THEN
        expect(comp.sucursales).toBe(foundSucursales);
      });
    });
  });
});

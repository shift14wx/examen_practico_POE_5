/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CargosDetailComponent from '@/entities/cargos/cargos-details.vue';
import CargosClass from '@/entities/cargos/cargos-details.component';
import CargosService from '@/entities/cargos/cargos.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Cargos Management Detail Component', () => {
    let wrapper: Wrapper<CargosClass>;
    let comp: CargosClass;
    let cargosServiceStub: SinonStubbedInstance<CargosService>;

    beforeEach(() => {
      cargosServiceStub = sinon.createStubInstance<CargosService>(CargosService);

      wrapper = shallowMount<CargosClass>(CargosDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { cargosService: () => cargosServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCargos = { id: 123 };
        cargosServiceStub.find.resolves(foundCargos);

        // WHEN
        comp.retrieveCargos(123);
        await comp.$nextTick();

        // THEN
        expect(comp.cargos).toBe(foundCargos);
      });
    });
  });
});

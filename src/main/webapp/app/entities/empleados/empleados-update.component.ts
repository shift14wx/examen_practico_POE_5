import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CargosService from '../cargos/cargos.service';
import { ICargos } from '@/shared/model/cargos.model';

import SucursalesService from '../sucursales/sucursales.service';
import { ISucursales } from '@/shared/model/sucursales.model';

import AlertService from '@/shared/alert/alert.service';
import { IEmpleados, Empleados } from '@/shared/model/empleados.model';
import EmpleadosService from './empleados.service';

const validations: any = {
  empleados: {
    nombre: {},
    telefono: {},
    sueldo: {},
  },
};

@Component({
  validations,
})
export default class EmpleadosUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('empleadosService') private empleadosService: () => EmpleadosService;
  public empleados: IEmpleados = new Empleados();

  @Inject('cargosService') private cargosService: () => CargosService;

  public cargos: ICargos[] = [];

  @Inject('sucursalesService') private sucursalesService: () => SucursalesService;

  public sucursales: ISucursales[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.empleadosId) {
        vm.retrieveEmpleados(to.params.empleadosId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.empleados.id) {
      this.empleadosService()
        .update(this.empleados)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.empleados.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.empleadosService()
        .create(this.empleados)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.empleados.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEmpleados(empleadosId): void {
    this.empleadosService()
      .find(empleadosId)
      .then(res => {
        this.empleados = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cargosService()
      .retrieve()
      .then(res => {
        this.cargos = res.data;
      });
    this.sucursalesService()
      .retrieve()
      .then(res => {
        this.sucursales = res.data;
      });
  }
}

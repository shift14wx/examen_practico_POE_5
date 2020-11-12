import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EmpleadosService from '../empleados/empleados.service';
import { IEmpleados } from '@/shared/model/empleados.model';

import AlertService from '@/shared/alert/alert.service';
import { ISucursales, Sucursales } from '@/shared/model/sucursales.model';
import SucursalesService from './sucursales.service';

const validations: any = {
  sucursales: {
    sucursal: {},
    telefono: {},
  },
};

@Component({
  validations,
})
export default class SucursalesUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('sucursalesService') private sucursalesService: () => SucursalesService;
  public sucursales: ISucursales = new Sucursales();

  @Inject('empleadosService') private empleadosService: () => EmpleadosService;

  public empleados: IEmpleados[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sucursalesId) {
        vm.retrieveSucursales(to.params.sucursalesId);
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
    if (this.sucursales.id) {
      this.sucursalesService()
        .update(this.sucursales)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.sucursales.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.sucursalesService()
        .create(this.sucursales)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.sucursales.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveSucursales(sucursalesId): void {
    this.sucursalesService()
      .find(sucursalesId)
      .then(res => {
        this.sucursales = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.empleadosService()
      .retrieve()
      .then(res => {
        this.empleados = res.data;
      });
  }
}

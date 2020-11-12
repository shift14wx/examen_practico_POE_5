import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EmpleadosService from '../empleados/empleados.service';
import { IEmpleados } from '@/shared/model/empleados.model';

import AlertService from '@/shared/alert/alert.service';
import { ICargos, Cargos } from '@/shared/model/cargos.model';
import CargosService from './cargos.service';

const validations: any = {
  cargos: {
    cargo: {},
  },
};

@Component({
  validations,
})
export default class CargosUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('cargosService') private cargosService: () => CargosService;
  public cargos: ICargos = new Cargos();

  @Inject('empleadosService') private empleadosService: () => EmpleadosService;

  public empleados: IEmpleados[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cargosId) {
        vm.retrieveCargos(to.params.cargosId);
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
    if (this.cargos.id) {
      this.cargosService()
        .update(this.cargos)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.cargos.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.cargosService()
        .create(this.cargos)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('examenpracticocincoApp.cargos.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCargos(cargosId): void {
    this.cargosService()
      .find(cargosId)
      .then(res => {
        this.cargos = res;
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

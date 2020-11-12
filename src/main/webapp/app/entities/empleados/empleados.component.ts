import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEmpleados } from '@/shared/model/empleados.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EmpleadosService from './empleados.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Empleados extends mixins(AlertMixin) {
  @Inject('empleadosService') private empleadosService: () => EmpleadosService;
  private removeId: number = null;

  public empleados: IEmpleados[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEmpleadoss();
  }

  public clear(): void {
    this.retrieveAllEmpleadoss();
  }

  public retrieveAllEmpleadoss(): void {
    this.isFetching = true;

    this.empleadosService()
      .retrieve()
      .then(
        res => {
          this.empleados = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEmpleados): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEmpleados(): void {
    this.empleadosService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('examenpracticocincoApp.empleados.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEmpleadoss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

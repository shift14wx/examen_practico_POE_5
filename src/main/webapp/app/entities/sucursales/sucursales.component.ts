import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ISucursales } from '@/shared/model/sucursales.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import SucursalesService from './sucursales.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Sucursales extends mixins(AlertMixin) {
  @Inject('sucursalesService') private sucursalesService: () => SucursalesService;
  private removeId: number = null;

  public sucursales: ISucursales[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllSucursaless();
  }

  public clear(): void {
    this.retrieveAllSucursaless();
  }

  public retrieveAllSucursaless(): void {
    this.isFetching = true;

    this.sucursalesService()
      .retrieve()
      .then(
        res => {
          this.sucursales = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ISucursales): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeSucursales(): void {
    this.sucursalesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('examenpracticocincoApp.sucursales.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllSucursaless();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICargos } from '@/shared/model/cargos.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CargosService from './cargos.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Cargos extends mixins(AlertMixin) {
  @Inject('cargosService') private cargosService: () => CargosService;
  private removeId: number = null;

  public cargos: ICargos[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCargoss();
  }

  public clear(): void {
    this.retrieveAllCargoss();
  }

  public retrieveAllCargoss(): void {
    this.isFetching = true;

    this.cargosService()
      .retrieve()
      .then(
        res => {
          this.cargos = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICargos): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCargos(): void {
    this.cargosService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('examenpracticocincoApp.cargos.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllCargoss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { ISucursales } from '@/shared/model/sucursales.model';
import SucursalesService from './sucursales.service';

@Component
export default class SucursalesDetails extends Vue {
  @Inject('sucursalesService') private sucursalesService: () => SucursalesService;
  public sucursales: ISucursales = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sucursalesId) {
        vm.retrieveSucursales(to.params.sucursalesId);
      }
    });
  }

  public retrieveSucursales(sucursalesId) {
    this.sucursalesService()
      .find(sucursalesId)
      .then(res => {
        this.sucursales = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

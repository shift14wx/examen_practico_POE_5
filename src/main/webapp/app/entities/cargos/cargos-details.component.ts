import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICargos } from '@/shared/model/cargos.model';
import CargosService from './cargos.service';

@Component
export default class CargosDetails extends Vue {
  @Inject('cargosService') private cargosService: () => CargosService;
  public cargos: ICargos = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cargosId) {
        vm.retrieveCargos(to.params.cargosId);
      }
    });
  }

  public retrieveCargos(cargosId) {
    this.cargosService()
      .find(cargosId)
      .then(res => {
        this.cargos = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

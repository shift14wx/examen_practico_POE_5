import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEmpleados } from '@/shared/model/empleados.model';
import EmpleadosService from './empleados.service';

@Component
export default class EmpleadosDetails extends Vue {
  @Inject('empleadosService') private empleadosService: () => EmpleadosService;
  public empleados: IEmpleados = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.empleadosId) {
        vm.retrieveEmpleados(to.params.empleadosId);
      }
    });
  }

  public retrieveEmpleados(empleadosId) {
    this.empleadosService()
      .find(empleadosId)
      .then(res => {
        this.empleados = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { IEmpleados } from '@/shared/model/empleados.model';

export interface ICargos {
  id?: number;
  cargo?: string;
  empleados?: IEmpleados[];
}

export class Cargos implements ICargos {
  constructor(public id?: number, public cargo?: string, public empleados?: IEmpleados[]) {}
}

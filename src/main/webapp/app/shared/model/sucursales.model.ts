import { IEmpleados } from '@/shared/model/empleados.model';

export interface ISucursales {
  id?: number;
  sucursal?: string;
  telefono?: string;
  empleados?: IEmpleados[];
}

export class Sucursales implements ISucursales {
  constructor(public id?: number, public sucursal?: string, public telefono?: string, public empleados?: IEmpleados[]) {}
}

import { ICargos } from '@/shared/model/cargos.model';
import { ISucursales } from '@/shared/model/sucursales.model';

export interface IEmpleados {
  id?: number;
  nombre?: string;
  telefono?: string;
  sueldo?: number;
  cargos?: ICargos;
  sucursales?: ISucursales;
}

export class Empleados implements IEmpleados {
  constructor(
    public id?: number,
    public nombre?: string,
    public telefono?: string,
    public sueldo?: number,
    public cargos?: ICargos,
    public sucursales?: ISucursales
  ) {}
}

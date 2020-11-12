import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Cargos = () => import('@/entities/cargos/cargos.vue');
// prettier-ignore
const CargosUpdate = () => import('@/entities/cargos/cargos-update.vue');
// prettier-ignore
const CargosDetails = () => import('@/entities/cargos/cargos-details.vue');
// prettier-ignore
const Sucursales = () => import('@/entities/sucursales/sucursales.vue');
// prettier-ignore
const SucursalesUpdate = () => import('@/entities/sucursales/sucursales-update.vue');
// prettier-ignore
const SucursalesDetails = () => import('@/entities/sucursales/sucursales-details.vue');
// prettier-ignore
const Empleados = () => import('@/entities/empleados/empleados.vue');
// prettier-ignore
const EmpleadosUpdate = () => import('@/entities/empleados/empleados-update.vue');
// prettier-ignore
const EmpleadosDetails = () => import('@/entities/empleados/empleados-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/cargos',
    name: 'Cargos',
    component: Cargos,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cargos/new',
    name: 'CargosCreate',
    component: CargosUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cargos/:cargosId/edit',
    name: 'CargosEdit',
    component: CargosUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cargos/:cargosId/view',
    name: 'CargosView',
    component: CargosDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sucursales/new',
    name: 'SucursalesCreate',
    component: SucursalesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sucursales/:sucursalesId/edit',
    name: 'SucursalesEdit',
    component: SucursalesUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sucursales/:sucursalesId/view',
    name: 'SucursalesView',
    component: SucursalesDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: Empleados,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleados/new',
    name: 'EmpleadosCreate',
    component: EmpleadosUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleados/:empleadosId/edit',
    name: 'EmpleadosEdit',
    component: EmpleadosUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleados/:empleadosId/view',
    name: 'EmpleadosView',
    component: EmpleadosDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];

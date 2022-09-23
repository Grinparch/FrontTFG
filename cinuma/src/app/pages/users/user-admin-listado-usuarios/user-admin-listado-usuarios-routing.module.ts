import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdminListadoUsuariosPage } from './user-admin-listado-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UserAdminListadoUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdminListadoUsuariosPageRoutingModule {}

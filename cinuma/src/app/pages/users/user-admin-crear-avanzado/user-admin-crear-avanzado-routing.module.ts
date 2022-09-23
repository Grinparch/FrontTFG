import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdminCrearAvanzadoPage } from './user-admin-crear-avanzado.page';

const routes: Routes = [
  {
    path: '',
    component: UserAdminCrearAvanzadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdminCrearModeradorPageRoutingModule {}

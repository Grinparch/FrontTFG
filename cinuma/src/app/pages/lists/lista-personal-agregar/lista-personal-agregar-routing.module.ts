import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPersonalAgregarPage } from './lista-personal-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPersonalAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPersonalAgregarPageRoutingModule {}

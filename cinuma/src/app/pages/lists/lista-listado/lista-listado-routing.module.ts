import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaListadoPage } from './lista-listado.page';

const routes: Routes = [
  {
    path: '',
    component: ListaListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaListadoPageRoutingModule {}

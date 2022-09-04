import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPersonalElementoDetallesPage } from './lista-personal-elemento-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPersonalElementoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPersonalElementoDetallesPageRoutingModule {}

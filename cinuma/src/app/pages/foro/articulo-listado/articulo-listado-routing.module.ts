import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloListadoPage } from './articulo-listado.page';

const routes: Routes = [
  {
    path: '',
    component: ArticuloListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloListadoPageRoutingModule {}

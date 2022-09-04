import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoListadoPage } from './grupo-listado.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoListadoPageRoutingModule {}

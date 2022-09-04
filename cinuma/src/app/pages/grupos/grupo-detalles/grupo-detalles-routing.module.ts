import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoDetallesPage } from './grupo-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoDetallesPageRoutingModule {}

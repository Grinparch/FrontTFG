import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoCrearPage } from './grupo-crear.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoCrearPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoListadoPage } from './elemento-listado.page';

const routes: Routes = [
  {
    path: '',
    component: ElementoListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementoListadoPageRoutingModule {}

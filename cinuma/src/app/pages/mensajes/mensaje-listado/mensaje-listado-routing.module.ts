import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajeListadoPage } from './mensaje-listado.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajeListadoPageRoutingModule {}

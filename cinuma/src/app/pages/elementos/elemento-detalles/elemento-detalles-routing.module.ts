import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoDetallesPage } from './elemento-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ElementoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementoDetallesPageRoutingModule {}

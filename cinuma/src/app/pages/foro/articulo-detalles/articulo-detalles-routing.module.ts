import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloDetallesPage } from './articulo-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ArticuloDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloDetallesPageRoutingModule {}

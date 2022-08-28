import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoCrearPage } from './elemento-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ElementoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementoCrearPageRoutingModule {}

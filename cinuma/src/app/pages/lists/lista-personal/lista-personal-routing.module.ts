import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPersonalPage } from './lista-personal.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPersonalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalListPage } from './personal-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalListPageRoutingModule {}

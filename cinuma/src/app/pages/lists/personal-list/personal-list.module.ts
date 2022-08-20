import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalListPageRoutingModule } from './personal-list-routing.module';

import { PersonalListPage } from './personal-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalListPageRoutingModule
  ],
  declarations: [PersonalListPage]
})
export class PersonalListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPersonalPageRoutingModule } from './lista-personal-routing.module';

import { ListaPersonalPage } from './lista-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPersonalPageRoutingModule
  ],
  declarations: [ListaPersonalPage]
})
export class ListaPersonalPageModule {}

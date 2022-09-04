import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCrearPageRoutingModule } from './lista-crear-routing.module';

import { ListaCrearPage } from './lista-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCrearPageRoutingModule
  ],
  declarations: [ListaCrearPage]
})
export class ListaCrearPageModule {}

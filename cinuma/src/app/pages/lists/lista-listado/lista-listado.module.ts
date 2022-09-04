import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaListadoPageRoutingModule } from './lista-listado-routing.module';

import { ListaListadoPage } from './lista-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaListadoPageRoutingModule
  ],
  declarations: [ListaListadoPage]
})
export class ListaListadoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoListadoPageRoutingModule } from './grupo-listado-routing.module';

import { GrupoListadoPage } from './grupo-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoListadoPageRoutingModule
  ],
  declarations: [GrupoListadoPage]
})
export class GrupoListadoPageModule {}

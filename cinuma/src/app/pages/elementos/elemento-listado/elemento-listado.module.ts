import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementoListadoPageRoutingModule } from './elemento-listado-routing.module';

import { ElementoListadoPage } from './elemento-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementoListadoPageRoutingModule
  ],
  declarations: [ElementoListadoPage]
})
export class ElementoListadoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajeListadoPageRoutingModule } from './mensaje-listado-routing.module';

import { MensajeListadoPage } from './mensaje-listado.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MensajeListadoPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MensajeListadoPage]
})
export class MensajeListadoPageModule {}

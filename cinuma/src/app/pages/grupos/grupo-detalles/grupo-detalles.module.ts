import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoDetallesPageRoutingModule } from './grupo-detalles-routing.module';

import { GrupoDetallesPage } from './grupo-detalles.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GrupoDetallesPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [GrupoDetallesPage]
})
export class GrupoDetallesPageModule {}

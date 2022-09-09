import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoCrearPageRoutingModule } from './grupo-crear-routing.module';

import { GrupoCrearPage } from './grupo-crear.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GrupoCrearPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [GrupoCrearPage]
})
export class GrupoCrearPageModule {}

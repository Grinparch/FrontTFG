import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPersonalAgregarPageRoutingModule } from './lista-personal-agregar-routing.module';

import { ListaPersonalAgregarPage } from './lista-personal-agregar.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListaPersonalAgregarPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ListaPersonalAgregarPage]
})
export class ListaPersonalAgregarPageModule {}

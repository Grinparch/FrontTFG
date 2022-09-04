import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPersonalElementoDetallesPageRoutingModule } from './lista-personal-elemento-detalles-routing.module';

import { ListaPersonalElementoDetallesPage } from './lista-personal-elemento-detalles.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListaPersonalElementoDetallesPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ListaPersonalElementoDetallesPage]
})
export class ListaPersonalElementoDetallesPageModule {}

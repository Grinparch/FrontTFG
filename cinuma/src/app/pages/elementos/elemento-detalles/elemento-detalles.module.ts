import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementoDetallesPageRoutingModule } from './elemento-detalles-routing.module';

import { ElementoDetallesPage } from './elemento-detalles.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ElementoDetallesPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ElementoDetallesPage]
})
export class ElementoDetallesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementoCrearPageRoutingModule } from './elemento-crear-routing.module';

import { ElementoCrearPage } from './elemento-crear.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ElementoCrearPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ElementoCrearPage]
})
export class ElementoCrearPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticuloCrearPageRoutingModule } from './articulo-crear-routing.module';

import { ArticuloCrearPage } from './articulo-crear.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ArticuloCrearPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ArticuloCrearPage]
})
export class ArticuloCrearPageModule {}

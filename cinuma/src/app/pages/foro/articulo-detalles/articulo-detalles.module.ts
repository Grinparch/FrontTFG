import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticuloDetallesPageRoutingModule } from './articulo-detalles-routing.module';

import { ArticuloDetallesPage } from './articulo-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticuloDetallesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArticuloDetallesPage]
})
export class ArticuloDetallesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPerfilPageRoutingModule } from './user-perfil-routing.module';

import { UserPerfilPage } from './user-perfil.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPerfilPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UserPerfilPage]
})
export class UserPerfilPageModule {}

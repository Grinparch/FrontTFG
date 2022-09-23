import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAdminCrearModeradorPageRoutingModule } from './user-admin-crear-avanzado-routing.module';

import { UserAdminCrearAvanzadoPage } from './user-admin-crear-avanzado.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserAdminCrearModeradorPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UserAdminCrearAvanzadoPage]
})
export class UserAdminCrearAvanzadoPageModule {}

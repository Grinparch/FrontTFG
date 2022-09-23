import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAdminListadoUsuariosPageRoutingModule } from './user-admin-listado-usuarios-routing.module';

import { UserAdminListadoUsuariosPage } from './user-admin-listado-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAdminListadoUsuariosPageRoutingModule
  ],
  declarations: [UserAdminListadoUsuariosPage]
})
export class UserAdminListadoUsuariosPageModule {}

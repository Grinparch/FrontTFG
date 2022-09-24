import { Component, OnInit } from '@angular/core';
import {Perfil} from "../../../core/models/Perfil";
import {Lista} from "../../../core/models/Lista";
import {ElementoService} from "../../../core/services/elemento.service";
import {PerfilService} from "../../../core/services/perfil.service";
import {ListaService} from "../../../core/services/lista.service";
import {ModalController} from "@ionic/angular";
import {AutenticacionService} from "../../../core/services/autenticacion.service";
import {Router} from "@angular/router";
import {Elemento} from "../../../core/models/Elemento";
import {ListaCrearPage} from "../../lists/lista-crear/lista-crear.page";
import {Usuario} from "../../../core/models/Usuario";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-admin-listado-usuarios',
  templateUrl: './user-admin-listado-usuarios.page.html',
  styleUrls: ['./user-admin-listado-usuarios.page.scss'],
})
export class UserAdminListadoUsuariosPage implements OnInit {
  usuarios: Usuario[];
  username: string;

  constructor(public  elementoService: ElementoService,
              public  perfilService: PerfilService,
              public  usuarioService: UserService,
              private modalController: ModalController,
              private autenticacionService: AutenticacionService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.getUsername() != undefined){
      if(Number(this.getRol()) == 0){
        this.loadUsuarios();
      }else{
        this.router.navigate(['/pagina-principal']);
      }
    }else{
      this.router.navigate(['/pagina-principal']);
    }
  }

  private loadUsuarios(){
    this.usuarioService.getAllUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log("usuarios todos");
      console.log(this.usuarios);
    });
  }

  irACrearUsuarioAvanzado(){
    this.router.navigate(['/user-admin-crear-avanzado']);
  }

  eliminarUsuario(username:string){
    this.usuarioService.eliminarUsuarioPorAdmin(username);
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}

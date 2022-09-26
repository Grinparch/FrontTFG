import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../../core/models/Usuario";
import {UsuarioService} from "../../../core/services/usuario.service";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {Perfil} from "../../../core/models/Perfil";
import {ListaPersonal} from "../../../core/models/ListaPersonal";
import {Elemento} from "../../../core/models/Elemento";
import {AutenticacionService} from "../../../core/services/autenticacion.service";
import {ListaPersonalService} from "../../../core/services/lista-personal.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  mensaje: string;
  user: Usuario;
  createUserForm: FormGroup;
  toast: HTMLIonToastElement;


  constructor(
    private userService: UsuarioService,
    private autenticacionService: AutenticacionService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.getUsername() == undefined){
      this.buildForm();
    }else{
      this.router.navigate(['/pagina-principal']);
    }
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async createUser() {
    if (!this.createUserForm.valid){
    }
    else {
      this.userValueAssignation();
    }
  }

  private buildForm() {
    this.createUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', Validators.maxLength(12) ),
    });
  }

  private async userValueAssignation() {

    const newAuth: Autenticacion = {
      autenticacionId: null,
      usuario: this.createUserForm.value.username,
      clave: this.createUserForm.value.clave,
    };
    const newUser: Usuario = {
      userId: null,
      email: this.createUserForm.value.email,
      username: this.createUserForm.value.username,
      phone: this.createUserForm.value.phone,
      rol: null,
      autenticacion: newAuth,
      perfil: null,
    };
    this.userService.getVerificacionUsername(newUser.username).subscribe((existe)=>{
      if(existe)
        this.mensaje = "Usuario Ya existente";
      else{
        this.userService.addUser(newUser);
      }
    });

  }

  saveData(username:string,rol:number) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('rol', rol.toString());
  }
  getUsername() {
    return sessionStorage.getItem('username');
  }
  getRol() {
    return sessionStorage.getItem('rol');
  }
}

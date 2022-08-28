import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../../core/models/Usuario";
import {UserService} from "../../../core/services/user.service";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {Perfil} from "../../../core/models/Perfil";
import {ListaPersonal} from "../../../core/models/ListaPersonal";
import {Elemento} from "../../../core/models/Elemento";
import {AutenticacionService} from "../../../core/services/autenticacion.service";
import {ListaPersonalService} from "../../../core/services/lista-personal.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  user: Usuario;
  createUserForm: FormGroup;
  usuarioYaExistente: boolean;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.usuarioYaExistente = false;
    this.route.queryParams
      .subscribe(params => {
        console.log("params");
        console.log(params);
          if(params.error!=undefined){
            this.usuarioYaExistente = true;
          }
        }
      );
  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async createUser() {
    if (!this.createUserForm.valid){
      console.log('Form has errors. Please provide all the required values!');
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
      phone: new FormControl('', ), // Validators.pattern('^\\+[1-9]\\d{1,14}$')
    });
  }

  private async userValueAssignation() {
    console.log("antes de new user");
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
    console.log("antes de add user");
    this.userService.addUser(newUser).then(()=>{

    }).finally(()=>{
      const usuarioRespuesta = this.userService.usuario;
      /*
      console.log("usuarioRespuesta.username");
      console.log(usuarioRespuesta.username);
      console.log("usuarioRespuesta.rol");
      console.log(usuarioRespuesta.rol);
      this.saveData(usuarioRespuesta.username, usuarioRespuesta.rol);
      console.log(this.getUsername());
      */
    })
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

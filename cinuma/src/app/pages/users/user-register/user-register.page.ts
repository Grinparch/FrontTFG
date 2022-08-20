import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../../core/models/Usuario";
import {UserService} from "../../../core/services/user.service";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {Perfil} from "../../../core/models/Perfil";
import {ListaPersonal} from "../../../core/models/ListaPersonal";
import {Elemento} from "../../../core/models/Elemento";
import {AutenticacionService} from "../../../core/services/autenticacion.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  user: Usuario;
  createUserForm: FormGroup;


  constructor(
    private userService: UserService,
    private autenticationService: AutenticacionService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }
  z
  async createUser() {
    if (!this.createUserForm.valid){
      console.log('Form has errors. Please provide all the required values!');
    }
    else {
      this.userValueAssignation();
    }
  }

  private buildForm() {
    //* TODO improve validations
    this.createUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', ), // Validators.pattern('^\\+[1-9]\\d{1,14}$')
    });
  }

  private userValueAssignation() {
    console.log("antes de new user");
    const newAuth: Autenticacion = {
      autenticacionId: null,
      usuario: this.createUserForm.value.username,
      clave: this.createUserForm.value.clave,
    };

    const elementosVistosVacio: Elemento[]=[];

    const newListaPer: ListaPersonal = {
      listaPersonalId: null,
      elementosVistos: elementosVistosVacio
    };

    this.autenticationService.addAutenticacion(newAuth).catch((error) => {
      console.log(error);
    }).then((auth)=>{
      const newUser: Usuario = {
        userId: null,
        email: this.createUserForm.value.email,
        username: this.createUserForm.value.username,
        phone: this.createUserForm.value.phone,
        autenticacion: newAuth,
        perfil: null,
      };

      console.log("antes de add user");
      this.userService.addUser(newUser).catch((error) => {
        console.log(error);
      });
    })



    const newPerfil: Perfil = {
      perfilId: null,
      disponibleChat: this.createUserForm.value.username,
      listaPersonal: newListaPer
    };




  }
}

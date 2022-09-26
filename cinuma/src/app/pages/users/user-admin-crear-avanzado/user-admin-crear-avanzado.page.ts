import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../core/services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Autenticacion} from "../../../core/models/Autenticacion";

@Component({
  selector: 'app-user-admin-crear-avanzado',
  templateUrl: './user-admin-crear-avanzado.page.html',
  styleUrls: ['./user-admin-crear-avanzado.page.scss'],
})
export class UserAdminCrearAvanzadoPage implements OnInit {
  mensaje: string;
  user: Usuario;
  createUserForm: FormGroup;
  usuarioYaExistente: boolean;


  constructor(
    private userService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioYaExistente = false;
    this.route.queryParams
      .subscribe(params => {
          if(params.error!=undefined){
            this.usuarioYaExistente = true;
          }
        }
      );
  }

  ionViewWillEnter(){
    if(this.getUsername() != undefined){
      if(Number(this.getRol()) == 0){
        this.buildForm();
      }else{
        this.router.navigate(['/pagina-principal']);
      }
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
      rol: new FormControl('', [Validators.required, Validators.max(1), Validators.min(0)]),
      phone: new FormControl('', ), // Validators.pattern('^\\+[1-9]\\d{1,14}$')
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
      rol: this.createUserForm.value.rol,
      autenticacion: newAuth,
      perfil: null,
    };
    this.userService.getVerificacionUsername(newUser.username).subscribe((existe)=>{
      if(existe)
        this.mensaje = "Usuario Ya existente";
      else{
        this.userService.addUsuarioAvanzado(newUser);
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

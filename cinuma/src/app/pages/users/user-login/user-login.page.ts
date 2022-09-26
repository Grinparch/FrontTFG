import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../core/services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {AutenticacionService} from "../../../core/services/autenticacion.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  mensaje: string;
  user: Usuario;
  loginForm: FormGroup;
  usuarioYaExistente: boolean;


  constructor(
    private userService: UsuarioService,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute,
    private router: Router,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidEnter(){
    if(this.getUsername() == undefined){
      this.usuarioYaExistente = false;
      this.route.queryParams
        .subscribe(params => {
            if(params.error!=undefined){
              this.usuarioYaExistente = true;
            }
          }
        );
    } else{
      this.router.navigate(['/pagina-principal']);
    }
  }

  ionViewDidLeave(){
  }

  async login() {
    if (!this.loginForm.valid){
    }
    else {
      this.userValueAssignation();
    }
  }

  private buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      clave: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  private async userValueAssignation() {
    const auth: Autenticacion= {
      autenticacionId: null,
      usuario: this.loginForm.value.username,
      clave: this.loginForm.value.clave
    };
    this.autenticacionService.login(auth).subscribe(data=>{
      if(data!= null){
        if(data.username != undefined){
          this.autenticacionService.usuario.next("logged");
          this.saveData(data);
          window.location.reload();
          this.router.navigate(['/pagina-principal']);
        }else{
          this.mensaje = "Usuario Y/O Contraseña Incorrectos";
        }
      }
    });
  }

  saveData(user:Usuario) {
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('rol', user.rol.toString());
    sessionStorage.setItem('perfilId', user.perfil);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('phone', user.phone);
    sessionStorage.setItem('userId', user.userId);
  }
  getUsername() {
    return sessionStorage.getItem('username');
  }
  getRol() {
    return sessionStorage.getItem('rol');
  }
}

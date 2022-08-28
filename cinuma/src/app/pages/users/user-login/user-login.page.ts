import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {AutenticacionService} from "../../../core/services/autenticacion.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  user: Usuario;
  loginForm: FormGroup;
  usuarioYaExistente: boolean;


  constructor(
    private userService: UserService,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidEnter(){
    console.log("session storage before login");
    console.log(sessionStorage.usuario);
    if(sessionStorage.usuario == undefined){
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
    } else{
      this.router.navigate(['/pagina-principal']);
    }
  }

  ionViewDidLeave(){
  }

  async createUser() {
    if (!this.loginForm.valid){
      console.log('Form has errors. Please provide all the required values!');
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
      clave: this.loginForm.value.clave,
    };
    this.autenticacionService.login(auth).then(()=>{

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

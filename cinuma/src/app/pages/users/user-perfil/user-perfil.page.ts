import {Component, ElementRef, OnInit} from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {Generos} from "../../../core/models/Generos";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController, PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Perfil} from "../../../core/models/Perfil";
import { PerfilService } from 'src/app/core/services/perfil.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';


@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {
  generos: Array<string> = Object.keys(Generos).filter(key => isNaN(+key));
  generoSeleccionado: string;
  username: string;
  usuario: Usuario = new Usuario();
  perfil: Perfil;
  editMode = false;
  esMiPerfil = false;

  editarPerfilForm: FormGroup = new FormGroup({
    actoresPreferidos: new FormControl('', [Validators.minLength(2)]),
    vinculosAsociados: new FormControl('', [Validators.minLength(2)]),
    disponibleChat: new FormControl('', []),
    avatar: new FormControl('')
  });

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public autenticacionService: AutenticacionService,
    public perfilService: PerfilService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){

  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      console.log("before user data");
      this.loadUserData();
      this.usuario.perfil = sessionStorage.getItem('perfilId');
      console.log("perfil session storage");
      console.log(sessionStorage.getItem('perfilId'));
      console.log("before perfil data");
      this.loadPerfilData(this.usuario.perfil);
      console.log("FINISH");
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  ionViewDidLeave(){
    this.editMode = false;
  }

  changeEditMode(){
    this.editMode = (!this.editMode);
  }

  async updateUser() {
    console.log("before checking validity");
    if (!this.editarPerfilForm.valid){
      const firstNgInvalid: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
      this.editarPerfilForm.markAllAsTouched();
      (firstNgInvalid as HTMLIonInputElement).setFocus().then();
    }
    else {
      console.log("perfil en update");
      const array: string[] = [];
      if(this.perfil.actoresPreferidos == undefined)
        this.perfil.actoresPreferidos = array;
      if(this.perfil.vinculosAsociados == undefined)
        this.perfil.vinculosAsociados = array;
      if(this.editarPerfilForm.get('actoresPreferidos').value != null &&
         this.editarPerfilForm.get('actoresPreferidos').value != undefined &&
         this.editarPerfilForm.get('actoresPreferidos').value != '')
        this.perfil.actoresPreferidos.push(this.editarPerfilForm.get('actoresPreferidos').value);

      if(this.editarPerfilForm.get('vinculosAsociados').value != null &&
        this.editarPerfilForm.get('vinculosAsociados').value != undefined &&
        this.editarPerfilForm.get('vinculosAsociados').value != '')
        this.perfil.vinculosAsociados.push(this.editarPerfilForm.get('vinculosAsociados').value);



      console.log(this.perfil);
      this.perfilService.updatePerfil(this.perfil).subscribe((perfil) => {
        console.log("perfil");
        console.log(perfil);
        this.perfil=perfil;
        //this.router.navigate(['/user-login']);
        this.editMode = false;
      });
    }
  }

  private loadUserData() {
    /*
    this.userService.getUsuarioEspecifico(username).subscribe( data => {
      this.usuario = data;
      this.loadPerfilData(data.perfil);
    });
    */
    this.usuario.username = sessionStorage.getItem('username');
    console.log("this.usuario.username");
    console.log(this.usuario.username);
    this.usuario.userId = sessionStorage.getItem('userId');
    console.log("this.usuario.userId");
    console.log(this.usuario.userId);
    this.usuario.email = sessionStorage.getItem('email');
    console.log("this.usuario.email");
    console.log(this.usuario.email);
    this.usuario.rol = Number(sessionStorage.getItem('rol'));
    console.log("this.usuario.rol");
    console.log(this.usuario.rol);
    this.usuario.phone = sessionStorage.getItem('phone');

  }

  changeGenero(){
    if(this.generoSeleccionado != undefined || this.generoSeleccionado != null){
      this.perfil.generoPreferido = this.generoSeleccionado;
    }
    console.log(this.perfil);
    this.perfilService.updatePerfil(this.perfil).subscribe((perfil) => {
      console.log("perfil");
      console.log(perfil);
      this.perfil=perfil;
      //this.router.navigate(['/user-login']);
      this.editMode = false;
    });
  }

  private loadPerfilData(perfilId: string){
    this.perfilService.getPerfilEspecifico(perfilId).subscribe(data => {
      console.log("data");
      console.log(data);
      this.perfil = data;
    });
  }

  borrarCuenta(){
    this.userService.eliminarUsuario(this.getUsername());
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  guardarGenero(genero:string){
    console.log("genero seleccionado");
    console.log(genero);
    this.generoSeleccionado = genero;
  }

  removerActorDeLista(actor:string){
    let index = 0;
    if(this.perfil.actoresPreferidos.length>0){
      this.perfil.actoresPreferidos.forEach(actorIteracion =>{
        if(actorIteracion==actor){
          this.perfil.actoresPreferidos.splice(index,1);
        }
        index++;
      })
    }
    console.log(this.perfil.actoresPreferidos);
  }

}

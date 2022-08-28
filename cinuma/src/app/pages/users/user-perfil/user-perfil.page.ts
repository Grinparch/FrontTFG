import {Component, ElementRef, OnInit} from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertController, ModalController, NavController, PopoverController} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Perfil} from "../../../core/models/Perfil";
import { PerfilService } from 'src/app/core/services/perfil.service';
import mongoose from "mongoose";

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {

  username: string;
  usuario: Usuario = new Usuario();
  perfil: Perfil;
  editMode = false;
  esMiPerfil = false;

  editarPerfilForm: FormGroup = new FormGroup({
    actoresPreferidos: new FormControl('', []),
    vinculosAsociados: new FormControl('', []),
    disponibleChat: new FormControl('', []),
    avatar: new FormControl('')
  });

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public perfilService: PerfilService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){

  }

  ionViewWillEnter(){
    console.log("before user data");
    this.loadUserData();
    this.usuario.perfil = sessionStorage.getItem('perfilId');
    console.log("perfil session storage");
    console.log(sessionStorage.getItem('perfilId'));
    console.log("before perfil data");
    this.loadPerfilData(this.usuario.perfil);
    console.log("FINISH");
  }

  ionViewDidLeave(){
    this.editMode = false;
  }

  changeEditMode(){
    this.editMode = (!this.editMode);
  }

  async updateUser() {
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
      this.perfil.actoresPreferidos.push(this.editarPerfilForm.get('actoresPreferidos').value);
      this.perfil.vinculosAsociados.push(this.editarPerfilForm.get('vinculosAsociados').value);
      this.perfil.disponibleChat= this.editarPerfilForm.get('disponibleChat').value;
      this.perfil.avatar= this.editarPerfilForm.get('avatar').value;

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

  private loadPerfilData(perfilId: string){
    this.perfilService.getPerfilEspecifico(perfilId).subscribe(data => {
      console.log("data");
      console.log(data);
      this.perfil = data;
      this.editarPerfilForm.patchValue({
        disponibleChat: this.perfil.disponibleChat,
        avatar: this.perfil.avatar
      });
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

}
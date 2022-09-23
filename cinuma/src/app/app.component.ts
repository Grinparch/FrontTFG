import {Component, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {BehaviorSubject} from "rxjs";
import {AutenticacionService} from "./core/services/autenticacion.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  rol: number;
  usuario: string;

  constructor(public menuCtrl: MenuController,
              private autenticacionService: AutenticacionService ) {
    autenticacionService.usuario.subscribe((valor)=>{
      if(valor!=null){
        this.usuario= this.getUsername();
        this.rol= Number(this.getRol());
      }
    })
  }

  ngOnInit(): void {
        this.rol = Number(this.getRol());
        this.usuario = this.getUsername();
    }

  ionViewDidEnter(){
    this.rol = Number(this.getRol());
    this.usuario = this.getUsername();
  }

  ionViewCanEnter(){

  }

  ionViewWillEnter(){
    this.rol = Number(this.getRol());
    this.usuario = this.getUsername();
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
  removeData() {
    sessionStorage.removeItem('location');
  }
  deleteData() {
    this.autenticacionService.logOut();
    this.autenticacionService.usuario.subscribe((valor)=>{
      if(valor==null){
        console.log("logOut");
        this.usuario= null;
        this.rol= null;
      }
    });
  }

  consoleLog(mensaje:string){
    console.log("mensaje de app component")
    console.log(mensaje)
  }
}

import { Injectable } from '@angular/core';
import {Usuario} from "../models/Usuario";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Autenticacion} from "../models/Autenticacion";
import {MenuController} from "@ionic/angular";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  autenticacion: Autenticacion;
  usuario: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  usuarioYaRegistrado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // paths
  addAuthPath = "http://localhost:8081/autenticacion/add";
  loginPath = "http://localhost:8081/autenticacion/login";

  constructor(private http: HttpClient,
              private router: Router) { }

  async addAutenticacion(newAuth: Autenticacion) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Autenticacion>(this.addAuthPath,
      {"autenticacionId": newAuth.autenticacionId,
        "usuario": newAuth.usuario,
        "clave": newAuth.clave},
      { headers }).pipe().subscribe(auth => {
      this.autenticacion = auth;
    });
  }

  async getAutenticacion() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.get<any>("http://localhost:8081/autenticacion/",
      { headers }).subscribe(data => {
    });
  }

  login(auth: Autenticacion){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<any>(this.loginPath,
      {"autenticacionId": auth.autenticacionId,
        "usuario": auth.usuario,
        "clave": auth.clave},
      { headers }) as Observable<any>;
  }

  async logOut(){
    this.usuario.next(null);
    sessionStorage.clear();
    await this.router.navigate(['/user-login'])
    window.location.reload();
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
  getPerfilId() {
    return sessionStorage.getItem('perfilId');
  }
}

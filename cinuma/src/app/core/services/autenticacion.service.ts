import { Injectable } from '@angular/core';
import {Usuario} from "../models/Usuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Autenticacion} from "../models/Autenticacion";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  autenticacion: Autenticacion;
  // paths
  addAuthPath = "http://localhost:8081/autenticacion/add";
  loginPath = "http://localhost:8081/autenticacion/login";

  constructor(private http: HttpClient) { }

  async addAutenticacion(newAuth: Autenticacion) {
    console.log("en add Auth");
    console.log(JSON.stringify(newAuth));
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
      console.log(data);
    });
  }

  async login(auth: Autenticacion){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.post<any>(this.loginPath,
      {"autenticacionId": auth.autenticacionId,
        "usuario": auth.usuario,
        "clave": auth.clave},
      { headers }).subscribe(data => {
        console.log("data");
        console.log(data);
      this.saveData(data);
    });
  }

  saveData(user:Usuario) {
    sessionStorage.setItem('usuario', user.username);
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

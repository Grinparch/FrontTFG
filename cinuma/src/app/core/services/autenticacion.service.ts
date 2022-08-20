import { Injectable } from '@angular/core';
import {Usuario} from "../models/Usuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Autenticacion} from "../models/Autenticacion";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // paths
  addAuthPath = "http://localhost:8081/autenticacion/add";

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
      console.log(auth);
    });
  }

  async getAutenticacion() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.get<any>("http://localhost:8081/autenticacion/",
      { headers }).subscribe(data => {
      console.log(data);
    });
  }
}

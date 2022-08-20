import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // paths
  addUserPath = "http://localhost:8081/usuarios/add";

  constructor(private http: HttpClient) { }

  async addUser(newUser: Usuario) {
    console.log("en add User");
    console.log(JSON.stringify(newUser));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Usuario>(this.addUserPath,
      {"userId": newUser.userId,
        "email": newUser.email,
        "username": newUser.username,
        "phone": newUser.phone,
        "autenticacion": newUser.autenticacion,
        "perfil": newUser.perfil},
      { headers }).pipe().subscribe(user => {
      console.log(user);
    });
  }

  async getUser() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar',
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With, content-type, Authorization, Host'})
    this.http.get<any>("http://localhost:8081/usuarios/",
      { headers }).subscribe(data => {
      console.log(data);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/Usuario";
import {catchError} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import * as http from "http";
import {NavController} from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import {Elemento} from "../models/Elemento";
import {Lista} from "../models/Lista";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuario: Usuario;
  // paths
  addUserPath = "http://localhost:8081/usuarios/addUsuarioComun";
  addUsuarioAvanzadoPath = "http://localhost:8081/usuarios/addUsuarioAvanzado";
  getUserPath = "http://localhost:8081/usuarios/byUsername/";
  getUsuariosRecomendadosPath = "http://localhost:8081/usuarios/recomendados/";
  getAllUsersPath = "http://localhost:8081/usuarios/";
  getAllUsersGrupoPath = "http://localhost:8081/usuarios/listaUsuarios/";
  eliminarUsuarioPath = "http://localhost:8081/usuarios/delete/";

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private router: Router) { }

  async addUser(newUser: Usuario){
    console.log("en add User");
    console.log(JSON.stringify(newUser));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.post<Usuario>(this.addUserPath,
      {"userId": newUser.userId,
        "email": newUser.email,
        "username": newUser.username,
        "phone": newUser.phone,
        "autenticacion": newUser.autenticacion,
        "perfil": newUser.perfil},
      { headers }).pipe().subscribe((usuario) => {
        console.log("usuario");
        console.log(usuario);
        this.usuario=usuario;
        this.router.navigate(['/user-login']);
       },(error) => {                              //Error callback
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 400:      //Usuario ya existente
                this.router.navigate(['/user-register'], { queryParams: { error: 'usuarioExistente' } });
                break;
            }
          }
        } else {
          console.error("some thing else happened");
        }
        return throwError(error);
      });
    return "Error";
  }

  async addUsuarioAvanzado(newUser: Usuario){
    console.log("en add User");
    console.log(JSON.stringify(newUser));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.post<Usuario>(this.addUsuarioAvanzadoPath,
      {"userId": newUser.userId,
        "email": newUser.email,
        "username": newUser.username,
        "phone": newUser.phone,
        "rol": newUser.rol,
        "autenticacion": newUser.autenticacion,
        "perfil": newUser.perfil},
      { headers }).pipe().subscribe((usuario) => {
      console.log("usuario");
      console.log(usuario);
    },(error) => {                              //Error callback
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error("Error Event");
        } else {
          console.log(`error status : ${error.status} ${error.statusText}`);
          switch (error.status) {
            case 400:      //Usuario ya existente
              this.router.navigate(['/user-admin-crear-avanzado'], { queryParams: { error: 'usuarioExistente' } });
              break;
          }
        }
      }
      return throwError(error);
    });
    return "Error";
  }

  getAllUsers() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Usuario[]>(this.getAllUsersPath,
      { headers }) as Observable<Usuario[]>;
  }

  getUsuariosRecomendados(perfilId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<String[]>(this.getUsuariosRecomendadosPath+perfilId,
      { headers }) as Observable<String[]>;
  }

  getUsuarioEspecifico(username: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Usuario>(this.getUserPath+username,
      { headers }) as Observable<Usuario>;
  }

  //Se utiliza post por que la llamada de Get no permite pasar un body
  getAllUsuariosGrupo(usuarios: String[]) {
    console.log("usuarios");
    console.log({"idUsuarios": usuarios});
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<Usuario[]>(this.getAllUsersGrupoPath,
      {"idUsuarios": usuarios},
      { headers }) as Observable<Usuario[]>;
  }

  eliminarUsuario(username: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete(this.eliminarUsuarioPath+username,
      { headers }).pipe().subscribe();
  }
}

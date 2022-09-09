import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Articulo} from "../models/Articulo";
import {Grupo} from "../models/Grupo";
import {Observable} from "rxjs";
import {Mensaje} from "../models/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
// paths
  getAllArticulosPath = "http://localhost:8081/articulo/";
  getAllMensajesDeUsuarioPath = "http://localhost:8081/mensaje/allMensajes/";
  getArticuloEspecificoPath = "http://localhost:8081/articulo/";
  enviarMensajePath = "http://localhost:8081/mensaje/add/";
  editarGrupoPath = "http://localhost:8081/grupo/editarGrupo/";
  unirseAGrupoPath = "http://localhost:8081/grupo/unirseAGrupo/";
  eliminarMensajePath = "http://localhost:8081/mensaje/delete/";

  constructor(private http: HttpClient) { }

  async enviarMensaje(newM: Mensaje) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.enviarMensajePath,
      {"mensajeId": newM.mensajeId,
        "autor": newM.autor,
        "autorId":newM.autorId,
        "receptor": newM.receptor,
        "receptorId": newM.receptorId,
        "fechaDeCreacion": newM.fechaDeCreacion,
        "contenido":newM.contenido},
      { headers }).pipe().subscribe();
  }

  getAllMensajesDeUsuario(receptorId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Mensaje[]>(this.getAllMensajesDeUsuarioPath+receptorId,
      { headers }) as Observable<Mensaje[]>;
  }

  eliminarMensaje(mensajeId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete(this.eliminarMensajePath+mensajeId,
      { headers }).pipe().subscribe();;
  }
}

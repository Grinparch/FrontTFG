import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Lista} from "../models/Lista";
import {Observable} from "rxjs";
import {Grupo} from "../models/Grupo";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
// paths
  getAllGruposPath = "http://localhost:8081/grupo/";
  getGrupoEspecificoPath = "http://localhost:8081/grupo/";
  getGrupoRecomendadoPath = "http://localhost:8081/grupo/recomendados/";
  crearGrupoPath = "http://localhost:8081/grupo/add/";
  editarGrupoPath = "http://localhost:8081/grupo/editarGrupo/";
  unirseAGrupoPath = "http://localhost:8081/grupo/unirseAGrupo/";
  eliminarGrupoPath = "http://localhost:8081/grupo/delete/";

  constructor(private http: HttpClient) { }

  async crearGrupo(newG: Grupo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.crearGrupoPath,
      {"grupoId": newG.grupoId,
        "lider": newG.lider,
        "miembros":newG.miembros,
        "elementosPreferidos": newG.elementosPreferidos,
        "nombre": newG.nombre,
        "descripcion": newG.descripcion},
      { headers }).pipe().subscribe();
  }

  editarGrupo(newG: Grupo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.editarGrupoPath,
      {"grupoId": newG.grupoId,
        "lider": newG.lider,
        "miembros":newG.miembros,
        "elementosPreferidos": newG.elementosPreferidos,
        "nombre": newG.nombre,
        "descripcion": newG.descripcion},
      { headers }).pipe().subscribe();
  }

  getAllGrupos() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Grupo[]>(this.getAllGruposPath,
      { headers }) as Observable<Grupo[]>;
  }

  getGrupoEspecifico(grupoId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Grupo>(this.getGrupoEspecificoPath+grupoId,
      { headers }) as Observable<Grupo>;
  }

  getGrupoRecomendado(perfilId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Grupo>(this.getGrupoRecomendadoPath+perfilId,
      { headers }) as Observable<Grupo>;
  }

  eliminarGrupo(grupoId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete(this.eliminarGrupoPath+grupoId,
      { headers }).pipe().subscribe();;
  }

  unirseAGrupo(nuevoMiembroId: string[], grupoId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.put(this.unirseAGrupoPath+grupoId,
      {"idUsuarios": nuevoMiembroId},
      { headers }).pipe().subscribe();
  }
}

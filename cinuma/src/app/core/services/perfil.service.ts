import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/Usuario";
import {Observable} from "rxjs";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Perfil} from "../models/Perfil";
import mongoose, {Types} from "mongoose";
import {ListaPersonal} from "../models/ListaPersonal";
import {Lista} from "../models/Lista";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // paths
  getPerfilPath = "http://localhost:8081/perfil/byPerfilId/";
  updatePerfilPath = "http://localhost:8081/perfil/update/";

  constructor(private http: HttpClient,
  private navCtrl: NavController,
  private router: Router) { }

  getPerfilEspecifico(perfilId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    console.log("perfilId");
    console.log(perfilId);
    return this.http.get<Perfil>(this.getPerfilPath+perfilId,
      { headers }) as Observable<Perfil>;
  }

  updatePerfil(perfil: Perfil){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.put<Perfil>(this.updatePerfilPath,
      {"perfilId": perfil.perfilId,
        "vistoUltimamente": perfil.vistoUltimamente,
        "generoPreferido": perfil.generoPreferido,
        "puntuacionPromedio": perfil.puntuacionPromedio,
        "actoresPreferidos": perfil.actoresPreferidos,
        "vinculosAsociados": perfil.vinculosAsociados,
        "disponibleChat": perfil.disponibleChat,
        "avatar": perfil.avatar,
        "listaPersonalId": perfil.listaPersonalId,
        "listasCreadas": perfil.listasCreadas},
      { headers }) as Observable<Perfil>;
  }
}

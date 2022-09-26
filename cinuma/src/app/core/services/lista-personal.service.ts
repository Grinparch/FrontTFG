import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Autenticacion} from "../models/Autenticacion";
import {ListaPersonal} from "../models/ListaPersonal";
import {Perfil} from "../models/Perfil";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListaPersonalService {
  listaPersonal: ListaPersonal;
// paths
  addListaPersonalPath = "http://localhost:8081/listaPersonal/add";
  listaPersonalGetPath = "http://localhost:8081/listaPersonal/";

  constructor(private http: HttpClient) { }

  async addListaPersonal(newLP: ListaPersonal) {
    console.log("en add ListaPersonal");
    console.log(JSON.stringify(newLP));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ListaPersonal>(this.addListaPersonalPath,
      {"listaPersonalId": newLP.listaPersonalId,
        "elementosVistos": newLP.elementosVistos},
      { headers }).pipe().subscribe(listaPer => {
        this.listaPersonal = listaPer;
    });
  }

  getListaPersonal(listaPersonalId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<ListaPersonal>(this.listaPersonalGetPath+listaPersonalId,
      { headers }) as Observable<ListaPersonal>;
  }
}

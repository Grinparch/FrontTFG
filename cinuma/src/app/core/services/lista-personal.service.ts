import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Autenticacion} from "../models/Autenticacion";
import {ListaPersonal} from "../models/ListaPersonal";

@Injectable({
  providedIn: 'root'
})
export class ListaPersonalService {
  listaPersonal: ListaPersonal;
// paths
  addAuthPath = "http://localhost:8081/listaPersonal/add";

  constructor(private http: HttpClient) { }

  async addListaPersonal(newLP: ListaPersonal) {
    console.log("en add ListaPersonal");
    console.log(JSON.stringify(newLP));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ListaPersonal>(this.addAuthPath,
      {"listaPersonalId": newLP.listaPersonalId,
        "elementosVistos": newLP.elementosVistos},
      { headers }).pipe().subscribe(listaPer => {
        this.listaPersonal = listaPer;
    });
  }

  async getListaPersonal() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.get<any>("http://localhost:8081/listaPersonal/",
      { headers }).subscribe(data => {
      console.log(data);
    });
  }
}

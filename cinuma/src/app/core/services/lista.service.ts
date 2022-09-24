import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Elemento} from "../models/Elemento";
import {Observable} from "rxjs";
import {Lista} from "../models/Lista";
import {ListaPersonal} from "../models/ListaPersonal";
import {ElementoEnlistado} from "../models/ElementoEnlistado";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ListaService {
// paths
  getAllListasPath = "http://localhost:8081/lista/";
  getListaEspecificaPath = "http://localhost:8081/lista/";
  addListaPath = "http://localhost:8081/lista/add/";
  editarListaPath = "http://localhost:8081/lista/editarLista/";
  eliminarListaPath = "http://localhost:8081/lista/delete/";

  constructor(private http: HttpClient,
              private router: Router) { }

  async addLista(newL: Lista) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.addListaPath,
      {"listaId": newL.listaId,
        "perfilId":newL.perfilId,
        "elementos": newL.elementos,
        "votos": newL.votos,
        "creador": newL.creador},
      { headers }).pipe().subscribe();
  }

  editarLista(newL: Lista){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.editarListaPath,
      {"listaId": newL.listaId,
        "perfilId":newL.perfilId,
        "elementos": newL.elementos,
        "votos": newL.votos,
        "creador": newL.creador},
      { headers }).pipe().subscribe(()=>{
      this.router.navigate(['/lista-personal']);
      window.location.reload();
    });
  }

  getAllListas() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Lista[]>(this.getAllListasPath,
      { headers }) as Observable<Lista[]>;
  }

  getListaEspecifica(listaId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Lista>(this.getListaEspecificaPath+listaId,
      { headers }) as Observable<Lista>;
  }

  eliminarLista(listaId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete(this.eliminarListaPath+listaId,
      { headers }).pipe().subscribe(()=>{
      this.router.navigate(['/lista-personal']);
      window.location.reload();
    });;
  }
}

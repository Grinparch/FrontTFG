import { Injectable } from '@angular/core';
import {Elemento} from "../models/Elemento";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ElementoEnlistado} from "../models/ElementoEnlistado";

@Injectable({
  providedIn: 'root'
})
export class ElementoEnlistadoService {

  // paths
  addPeliculaPath = "http://localhost:8081/elementoEnlistado/addPelicula/";
  addSeriePath = "http://localhost:8081/elementoEnlistado/addSerie/";
  editarPeliculaPath = "http://localhost:8081/elementoEnlistado/editarPelicula/";
  editarSeriePath = "http://localhost:8081/elementoEnlistado/editarSerie/";
  eliminarElementoEnlistadoPath = "http://localhost:8081/elementoEnlistado/delete/";

  constructor(private http: HttpClient) { }

  eliminarElemento(elementoEnlistadoId: string){
    console.log("delete elementEnlistId");
    console.log(elementoEnlistadoId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete<ElementoEnlistado>(this.eliminarElementoEnlistadoPath+elementoEnlistadoId,
      { headers }) as Observable<ElementoEnlistado>;
  }

  addPelicula(elementoEnlistado: ElementoEnlistado){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ElementoEnlistado>(this.addPeliculaPath,
      {"elementoEnlistadoId": elementoEnlistado.elementoEnlistadoId,
        "listaPersonalId": elementoEnlistado.listaPersonalId,
        "elementoId": elementoEnlistado.elementoId,
        "perfilId": elementoEnlistado.perfilId,
        "titulo": elementoEnlistado.titulo,
        "duracion": elementoEnlistado.duracion,
        "genero": elementoEnlistado.genero,
        "idioma": elementoEnlistado.idioma,
        "director": elementoEnlistado.director,
        "actores": elementoEnlistado.actores,
        "tipo": elementoEnlistado.tipo,
        "estrenoTaquilla": elementoEnlistado.estrenoTaquilla,
        "opinion": elementoEnlistado.opinion,
        "puntuacionPersonal": elementoEnlistado.puntuacionPersonal},
      { headers }) as Observable<ElementoEnlistado>;
  }

  addSerie(elementoEnlistado: ElementoEnlistado){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ElementoEnlistado>(this.addSeriePath,
      {"elementoEnlistadoId": elementoEnlistado.elementoEnlistadoId,
        "listaPersonalId": elementoEnlistado.listaPersonalId,
        "elementoId": elementoEnlistado.elementoId,
        "perfilId": elementoEnlistado.perfilId,
        "titulo": elementoEnlistado.titulo,
        "duracion": elementoEnlistado.duracion,
        "genero": elementoEnlistado.genero,
        "idioma": elementoEnlistado.idioma,
        "director": elementoEnlistado.director,
        "actores": elementoEnlistado.actores,
        "tipo": elementoEnlistado.tipo,
        "capitulos": elementoEnlistado.capitulos,
        "estreno": elementoEnlistado.estreno,
        "opinion": elementoEnlistado.opinion,
        "puntuacionPersonal": elementoEnlistado.puntuacionPersonal},
      { headers }) as Observable<ElementoEnlistado>;
  }

  editarPelicula(elementoEnlistado: ElementoEnlistado){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ElementoEnlistado>(this.editarPeliculaPath,
      {"elementoEnlistadoId": elementoEnlistado.elementoEnlistadoId,
        "listaPersonalId": elementoEnlistado.listaPersonalId,
        "elementoId": elementoEnlistado.elementoId,
        "perfilId": elementoEnlistado.perfilId,
        "titulo": elementoEnlistado.titulo,
        "duracion": elementoEnlistado.duracion,
        "genero": elementoEnlistado.genero,
        "idioma": elementoEnlistado.idioma,
        "director": elementoEnlistado.director,
        "actores": elementoEnlistado.actores,
        "tipo": elementoEnlistado.tipo,
        "estrenoTaquilla": elementoEnlistado.estrenoTaquilla,
        "opinion": elementoEnlistado.opinion,
        "puntuacionPersonal": elementoEnlistado.puntuacionPersonal},
      { headers }) as Observable<ElementoEnlistado>;
  }

  editarSerie(elementoEnlistado: ElementoEnlistado){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<ElementoEnlistado>(this.editarSeriePath,
      {"elementoEnlistadoId": elementoEnlistado.elementoEnlistadoId,
        "listaPersonalId": elementoEnlistado.listaPersonalId,
        "elementoId": elementoEnlistado.elementoId,
        "perfilId": elementoEnlistado.perfilId,
        "titulo": elementoEnlistado.titulo,
        "duracion": elementoEnlistado.duracion,
        "genero": elementoEnlistado.genero,
        "idioma": elementoEnlistado.idioma,
        "director": elementoEnlistado.director,
        "actores": elementoEnlistado.actores,
        "tipo": elementoEnlistado.tipo,
        "capitulos": elementoEnlistado.capitulos,
        "estreno": elementoEnlistado.estreno,
        "opinion": elementoEnlistado.opinion,
        "puntuacionPersonal": elementoEnlistado.puntuacionPersonal},
      { headers }) as Observable<ElementoEnlistado>;
  }
}

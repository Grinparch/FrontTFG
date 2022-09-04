import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Perfil} from "../models/Perfil";
import {Observable} from "rxjs";
import {Elemento} from "../models/Elemento";
import {PerfilService} from "./perfil.service";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  // paths
  getAllElementosPath = "http://localhost:8081/elemento/";
  getElementoEspecificoPath = "http://localhost:8081/elemento/";
  addPeliculaPath = "http://localhost:8081/elemento/addPelicula/";
  addSeriePath = "http://localhost:8081/elemento/addSerie/";
  deleteElementoPath = "http://localhost:8081/elemento/delete/";
  editarPeliculaPath = "http://localhost:8081/elemento/editarPelicula/";
  editarSeriePath = "http://localhost:8081/elemento/editarSerie/";

  constructor(private http: HttpClient) { }

  getAllElementos() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Elemento[]>(this.getAllElementosPath,
      { headers }) as Observable<Elemento[]>;
  }

  getElementoEspecifico(elementoId: string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Elemento>(this.getElementoEspecificoPath+elementoId,
      { headers }) as Observable<Elemento>;
  }

  addPelicula(elemento: Elemento){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Elemento>(this.addPeliculaPath,
      {"elementoId": elemento.elementoId,
        "titulo": elemento.titulo,
        "calificacionPromedio": elemento.calificacionPromedio,
        "duracion": elemento.duracion,
        "genero": elemento.genero,
        "idioma": elemento.idioma,
        "director": elemento.director,
        "actores": elemento.actores,
        "tipo": elemento.tipo,
        "estrenoTaquilla": elemento.estrenoTaquilla},
      { headers }) as Observable<Elemento>;
  }

  addSerie(elemento: Elemento){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Elemento>(this.addSeriePath,
      {"elementoId": elemento.elementoId,
        "titulo": elemento.titulo,
        "calificacionPromedio": elemento.calificacionPromedio,
        "duracion": elemento.duracion,
        "genero": elemento.genero,
        "idioma": elemento.idioma,
        "director": elemento.director,
        "actores": elemento.actores,
        "tipo": elemento.tipo,
        "capitulos": elemento.capitulos,
        "estreno": elemento.estreno},
      { headers }) as Observable<Elemento>;
  }

  editarPelicula(elemento: Elemento){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Elemento>(this.editarPeliculaPath,
      {"elementoId": elemento.elementoId,
        "titulo": elemento.titulo,
        "calificacionPromedio": elemento.calificacionPromedio,
        "duracion": elemento.duracion,
        "genero": elemento.genero,
        "idioma": elemento.idioma,
        "director": elemento.director,
        "actores": elemento.actores,
        "tipo": elemento.tipo,
        "estrenoTaquilla": elemento.estrenoTaquilla},
      { headers }) as Observable<Elemento>;
  }

  editarSerie(elemento: Elemento){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<Elemento>(this.editarSeriePath,
      {"elementoId": elemento.elementoId,
        "titulo": elemento.titulo,
        "calificacionPromedio": elemento.calificacionPromedio,
        "duracion": elemento.duracion,
        "genero": elemento.genero,
        "idioma": elemento.idioma,
        "director": elemento.director,
        "actores": elemento.actores,
        "tipo": elemento.tipo,
        "capitulos": elemento.capitulos,
        "estreno": elemento.estreno},
      { headers }) as Observable<Elemento>;
  }

  eliminarElemento(elementoId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete<Elemento>(this.deleteElementoPath+elementoId,
      { headers }) as Observable<Elemento>;
  }
}

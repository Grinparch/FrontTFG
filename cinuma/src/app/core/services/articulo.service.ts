import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Grupo} from "../models/Grupo";
import {Observable} from "rxjs";
import {Articulo, Comentario} from "../models/Articulo";
import {Mensaje} from "../models/Mensaje";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
// paths
  getAllArticulosPath = "http://localhost:8081/articulo/";
  getAllComentariosDeArticuloPath = "http://localhost:8081/articulo/allComentarios/";
  getArticuloEspecificoPath = "http://localhost:8081/articulo/";
  crearArticuloPath = "http://localhost:8081/articulo/add/";
  crearComentarioPath = "http://localhost:8081/articulo/addComentario/";
  eliminarArticuloPath = "http://localhost:8081/articulo/delete/";

  constructor(private http: HttpClient,
              private router: Router) { }

  async crearArticulo(newA: Articulo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.crearArticuloPath,
      {"articuloId": newA.articuloId,
        "titulo": newA.titulo,
        "contenido":newA.contenido,
        "tema": newA.tema,
        "autor": newA.autor,
        "autorId": newA.autorId,
        "generosAsociados":newA.generosAsociados,
        "tituloAsociado": newA.tituloAsociado,
        "fechaCreacion": newA.fechaCreacion},
      { headers }).pipe().subscribe(()=>
      this.router.navigate(['/articulo-listado']).then(()=>window.location.reload()
      ));
  }

  async agregarComentario(newC: Comentario) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post(this.crearComentarioPath,
      {"comentarioId": newC.comentarioId,
        "articuloId": newC.articuloId,
        "autor":newC.autor,
        "autorId": newC.autorId,
        "contenido": newC.contenido,
        "fechaCreacion": newC.fechaCreacion},
      { headers }).pipe().subscribe(()=>{
      window.location.reload();
    });
  }

  getAllArticulos() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Articulo[]>(this.getAllArticulosPath,
      { headers }) as Observable<Articulo[]>;
  }

  getAllComentariosDeArticulo(articuloId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Comentario[]>(this.getAllComentariosDeArticuloPath+articuloId,
      { headers }) as Observable<Comentario[]>;
  }

  getArticuloEspecifico(articuloId: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Articulo>(this.getArticuloEspecificoPath+articuloId,
      { headers }) as Observable<Articulo>;
  }

  eliminarArticulo(articuloId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.delete(this.eliminarArticuloPath+articuloId,
      { headers }).pipe().subscribe(()=>{
      this.router.navigate(['/articulo-listado']).then(()=>window.location.reload());
    });
  }
}

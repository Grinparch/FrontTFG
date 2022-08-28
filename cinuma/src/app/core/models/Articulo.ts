import mongoose from "mongoose";
import {Elemento} from "./Elemento";

export class Articulo {
  articuloId: string;
  titulo: string;
  contenido: string;
  tema: string;
  autor: string;
  fechaCreacion: Date;
  generosAsociados: string[];
  titulosAsociados: string[];
}

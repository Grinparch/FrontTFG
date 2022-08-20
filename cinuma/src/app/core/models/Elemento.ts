import mongoose from "mongoose";

export class Elemento {
  elementoId: mongoose.Types.ObjectId;
  titulo: string;
  calificacionPromedio: number;
  calificacionPersonal: number;
  duracion: number;
  genero: string[];
  idioma: string;
  director: string;
  actores: string[];
  opinion: string;
  tipo: number;                          //0 es serie, 1 es pelicula
  capitulos?: number;
  estreno?: Date;
  estrenoTaquilla?: Date;
}

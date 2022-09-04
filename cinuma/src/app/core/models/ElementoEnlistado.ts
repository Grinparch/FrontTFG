export class ElementoEnlistado {
  elementoEnlistadoId: string;
  elementoId: string;
  listaPersonalId: string;
  perfilId: string;
  puntuacionPersonal?: number;
  opinion?: string;
  titulo: string;
  calificacionPromedio: number;
  duracion: number;
  genero: string[];
  idioma: string;
  director: string;
  actores: string[];
  tipo: number;                          //0 es serie, 1 es pelicula
  capitulos?: number;
  estreno?: Date;
  estrenoTaquilla?: Date;
}

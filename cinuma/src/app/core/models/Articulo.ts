export class Articulo {
  articuloId: string;
  titulo: string;
  contenido: string;
  tema: string;
  autorId: string;
  autor: string;
  fechaCreacion: Date;
  generosAsociados: string[];
  tituloAsociado: string;
}

export class Comentario{
  comentarioId: string;
  articuloId: string;
  contenido: string;
  autorId: string;
  autor: string;
  fechaCreacion: Date;
}

import mongoose from "mongoose";
import {Elemento} from "./Elemento";

export class Lista {
  listaId: string;
  elementos: Elemento[];
  creador: string;
  votos: number;
}

import mongoose from "mongoose";
import {Elemento} from "./Elemento";

export class Lista {
  listaId: mongoose.Types.ObjectId;
  elementos: Elemento[];
  creador: string;
  votos: number;
}

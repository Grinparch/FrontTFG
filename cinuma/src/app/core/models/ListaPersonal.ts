import mongoose from "mongoose";
import {Elemento} from "./Elemento";

export class ListaPersonal {
  listaPersonalId: mongoose.Types.ObjectId;
  elementosVistos: Elemento[];
}

import mongoose from "mongoose";
import {Elemento} from "./Elemento";

export class ListaPersonal {
  listaPersonalId: string;
  elementosVistos: Elemento[];
}

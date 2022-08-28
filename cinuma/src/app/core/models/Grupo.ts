import mongoose from "mongoose";
import {Elemento} from "./Elemento";
import {Usuario} from "./Usuario";

export class Grupo {
  grupoId: mongoose.Types.ObjectId;
  nombre: string;
  elementosPreferidos: string[];
  elementosSinAprobar: JSON;
  miembros: string[];
  descripcion: string;
}

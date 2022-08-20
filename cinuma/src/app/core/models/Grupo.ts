import mongoose from "mongoose";
import {Elemento} from "./Elemento";
import {Usuario} from "./Usuario";

export class Grupo {
  grupoId: mongoose.Types.ObjectId;
  nombre: string;
  elementosPreferidos: Elemento[];
  elementosSinAprobar: JSON;
  miembros: Usuario[];
  descripcion: string;
}

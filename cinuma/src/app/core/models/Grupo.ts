import mongoose from "mongoose";
import {Elemento} from "./Elemento";
import {Usuario} from "./Usuario";

export class Grupo {
  grupoId: string;
  nombre: string;
  elementosPreferidos: string[];
  elementosSinAprobar?: JSON;
  miembros: string[];
  descripcion: string;
  lider: string;
}

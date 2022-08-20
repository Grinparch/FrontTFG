import * as mongoose from "mongoose";
import {Elemento} from "./Elemento";
import {ListaPersonal} from "./ListaPersonal";
import {Lista} from "./Lista";

export class Perfil {
  perfilId: mongoose.Types.ObjectId;
  vistoUltimamente?: Elemento;
  generoPreferido?: string;
  puntuacionPromedio?: number;
  actoresPreferidos?: string[];
  vinculosAsociados?: string[];
  disponibleChat: boolean;
  avatar?: string;
  listaPersonal: ListaPersonal;
  listasCreadas?: Lista;
}

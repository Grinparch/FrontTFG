import * as mongoose from "mongoose";
import {ListaPersonal} from "./ListaPersonal";
import {Lista} from "./Lista";

export class Perfil {
  perfilId: string;
  usuarioId: string;
  vistoUltimamente?: string;
  generoPreferido?: string;
  puntuacionPromedio?: number;
  actoresPreferidos?: string[];
  vinculosAsociados?: string[];
  disponibleChat: boolean;
  avatar?: string;
  listaPersonalId: string;
  listasCreadas?: string[];
}

import {Autenticacion} from "./Autenticacion";
import {Perfil} from "./Perfil";

export class Usuario {
  userId: string;
  email: string;
  username: string;
  phone?: string;
  autenticacion: Autenticacion;
  perfil: Perfil;
}

import {Autenticacion} from "./Autenticacion";
import mongoose from "mongoose";

export class Usuario {
  userId: string;
  email: string;
  username: string;
  phone?: string;
  rol: number; //0 -Administrador  1-Moderador   2-Usuario Comun
  autenticacion: Autenticacion;
  perfil?: string;
}

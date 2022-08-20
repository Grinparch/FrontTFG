import mongoose from "mongoose";

export class Autenticacion {
  autenticacionId: mongoose.Types.ObjectId;
  usuario: string;
  clave: string;
}

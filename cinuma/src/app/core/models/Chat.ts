import mongoose from "mongoose";
import {Usuario} from "./Usuario";

export class Chat {
  chatId: mongoose.Types.ObjectId;
  miembros: Usuario[];
  generos: string[];
  tags: string[];
}

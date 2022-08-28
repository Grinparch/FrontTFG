import mongoose from "mongoose";
import {Usuario} from "./Usuario";

export class Chat {
  chatId: string;
  miembros: Usuario[];
  generos: string[];
  tags: string[];
}

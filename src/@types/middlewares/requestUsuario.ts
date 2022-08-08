import { TokenUsuarioDTO } from "../../@types/dto/AutenticacaoDto";
import { Request } from "express";

export interface RequestUsuario extends Request {
  usuario: TokenUsuarioDTO;
}

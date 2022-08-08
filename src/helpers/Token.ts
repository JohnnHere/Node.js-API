import { sign, verify } from "jsonwebtoken";
import {
  RetornoAutenticacaoDTO,
  TokenUsuarioDTO,
} from "../@types/dto/AutenticacaoDTO";

export const verificarToken = (token: string): TokenUsuarioDTO => {
  return verify(token, process.env.AUTH_SECRET) as TokenUsuarioDTO;
};

export const gerarToken = (
  usuario: TokenUsuarioDTO
): RetornoAutenticacaoDTO => {
  const token = sign(usuario, process.env.AUTH_SECRET);
  return { token, tipoUsuario: usuario.tipoUsuario };
};

export const gerarTokenComTimer = (
  usuario: TokenUsuarioDTO
): RetornoAutenticacaoDTO => {
  const token = sign(usuario, process.env.AUTH_SECRET, { expiresIn: "2h" });
  return { token, tipoUsuario: usuario.tipoUsuario };
};

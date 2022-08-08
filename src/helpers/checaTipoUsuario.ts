import { TipoUsuario } from "../@types/dto/AutenticacaoDTO";
import { Usuario } from "../models/usuario";

export const checaTipoUsuario = (usuario: Usuario) => {
  if (usuario.admin) {
    return TipoUsuario.admin;
  }
  if (usuario.professor) {
    return TipoUsuario.professor;
  }
  if (usuario.aluno) {
    return TipoUsuario.aluno;
  }
};

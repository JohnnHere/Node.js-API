import { Turma } from "../../models/turma";
import { UsuarioDTO } from "./UsuarioDTO";

export interface CreateAlunoDTO {
  email: string;
  nome: string;
  fotoPerfil: string;
  senha: string;
  turmaId: string;
}

export interface CadastrarAlunoDTO {
  usuario: UsuarioDTO;
  turma: Turma;
}

import { Usuario } from "../../models/usuario";
import {
  RetornoCadastroUsuarioDTO,
  UpdateUsuarioDTO,
  UsuarioDTO,
} from "../dto/UsuarioDTO";

export interface ICreateUsuarioService {
  cadastrar({
    email,
    nome,
    fotoPerfil,
    senha,
  }: UsuarioDTO): Promise<RetornoCadastroUsuarioDTO>;
}

export interface IListUsuarioService {
  listar(): Promise<Usuario[]>;
}

export interface IUpdateSenhaUsuarioService {
  atualizar(
    usuarioId: string,
    senha: string
  ): Promise<RetornoCadastroUsuarioDTO>;
}

export interface IGetUsuarioService {
  buscar(id: string): Promise<RetornoCadastroUsuarioDTO>;
}

export interface IUpdateUsuarioService {
  atualizar(
    id,
    { email, nome, fotoPerfil }: Partial<UpdateUsuarioDTO>
  ): Promise<RetornoCadastroUsuarioDTO>;
}

export interface IDeleteUsuarioService {
  remover(usuarioId: string): Promise<void>;
}

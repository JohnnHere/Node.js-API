import { UpdateUsuarioDTO, UsuarioDTO } from "../dto/UsuarioDTO";
import { Usuario } from "../../models/usuario";
import { Repository } from "typeorm";

export interface IUsuarioRepository extends Repository<Usuario> {
  cadastrar({ email, nome, fotoPerfil, senha }: UsuarioDTO): Promise<Usuario>;
  atualizar(
    id,
    { email, nome, fotoPerfil }: Partial<UpdateUsuarioDTO>
  ): Promise<Usuario>;
  atualizaSenha(usuario: Usuario, senha: string): Promise<Usuario>;
  buscar(email: string): Promise<Usuario>;
  buscarPorId(id: string): Promise<Usuario>;
  remover(usuario: Usuario): Promise<void>;
  listar(): Promise<Usuario[]>;
}

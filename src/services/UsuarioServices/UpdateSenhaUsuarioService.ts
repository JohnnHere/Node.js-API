import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { hashSenha } from "../../helpers/HashSenha";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IUpdateSenhaUsuarioService } from "../../@types/services/IUsuarioService";
import { verificarToken } from "../../helpers/Token";
import { RetornoCadastroUsuarioDTO } from "../../@types/dto/UsuarioDTO";

@Service("UpdateSenhaUsuarioService")
export class UpdateSenhaUsuarioService implements IUpdateSenhaUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async atualizar(
    codigo: string,
    senha: string
  ): Promise<RetornoCadastroUsuarioDTO> {
    const token = verificarToken(codigo);

    const hash = hashSenha(senha);

    const existeUsuario = await this.usuarioRepository.buscarPorId(token.id);

    if (!existeUsuario) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const usuarioAtualizado = await this.usuarioRepository.atualizaSenha(
      existeUsuario,
      hash
    );

    return {
      id: usuarioAtualizado.id,
      email: usuarioAtualizado.email,
      nome: usuarioAtualizado.nome,
      fotoPerfil: usuarioAtualizado.fotoPerfil,
    };
  }
}

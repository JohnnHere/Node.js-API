import { IUpdateUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import {
  RetornoCadastroUsuarioDTO,
  UpdateUsuarioDTO,
} from "../../@types/dto/UsuarioDTO";

@Service("UpdateUsuarioService")
export class UpdateUsuarioService implements IUpdateUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async atualizar(
    id,
    { email, nome, fotoPerfil }: Partial<UpdateUsuarioDTO>
  ): Promise<RetornoCadastroUsuarioDTO> {
    const existeUsuario = await this.usuarioRepository.buscarPorId(id);

    if (!existeUsuario) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const usuario = await this.usuarioRepository.atualizar(id, {
      email,
      nome,
      fotoPerfil,
    });

    return usuario;
  }
}

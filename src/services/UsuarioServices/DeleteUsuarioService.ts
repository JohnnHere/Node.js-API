import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { Inject, Service } from "typedi";
import { IDeleteUsuarioService } from "../../@types/services/IUsuarioService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteUsuarioService")
export class DeleteUsuarioService implements IDeleteUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async remover(usuarioId: string): Promise<void> {
    const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.usuarioRepository.remover(usuario);
  }
}

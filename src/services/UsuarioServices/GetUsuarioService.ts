import { IGetUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetUsuarioService")
export class GetUsuarioService implements IGetUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async buscar(id: string) {
    const usuario = await this.usuarioRepository.buscarPorId(id);

    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      fotoPerfil: usuario.fotoPerfil,
    };
  }
}

import { IListUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { Usuario } from "../../models/usuario";

@Service("ListUsuarioService")
export class ListUsuarioService implements IListUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.listar();
  }
}

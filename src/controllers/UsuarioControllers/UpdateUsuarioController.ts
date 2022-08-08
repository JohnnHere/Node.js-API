import { IUpdateUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("UpdateUsuarioController")
export class UpdateUsuarioController {
  constructor(
    @Inject("UpdateUsuarioService")
    private updateUsuarioService: IUpdateUsuarioService
  ) {}

  async atualizar(request: Request, response: Response) {
    const usuarioId = request.params.id;
    const { email, nome, fotoPerfil } = request.body;

    const usuario = await this.updateUsuarioService.atualizar(usuarioId, {
      email,
      nome,
      fotoPerfil,
    });

    response.send(usuario);
  }
}

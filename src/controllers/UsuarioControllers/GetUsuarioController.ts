import { IGetUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("GetUsuarioController")
export class GetUsuarioController {
  constructor(
    @Inject("GetUsuarioService")
    private getUsuarioService: IGetUsuarioService
  ) {}

  async get(req: Request, res: Response) {
    const usuario = await this.getUsuarioService.buscar(String(req.params.id));

    res.send(usuario);
  }
}

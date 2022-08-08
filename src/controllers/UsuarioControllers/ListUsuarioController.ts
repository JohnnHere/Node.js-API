import { IListUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("ListUsuarioController")
export class ListUsuarioController {
  constructor(
    @Inject("ListUsuarioService")
    private listUsuarioService: IListUsuarioService
  ) {}

  async listar(req: Request, res: Response) {
    const usuario = await this.listUsuarioService.listar();

    res.send(usuario);
  }
}

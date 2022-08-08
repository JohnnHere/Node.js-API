import { Inject, Service } from "typedi";
import { IFavoritoRepository } from "../../@types/repositories/IFavoritoRepository";
import { Request, Response } from "express";

@Service("DeleteFavoritoController")
export class DeleteFavoritoController {
  constructor(
    @Inject("DeleteFavoritosService")
    private deleteFavoritoService: IFavoritoRepository
  ) { }

  async remover(req: Request, res: Response) {
    await this.deleteFavoritoService.remover(req.body);

    res.status(204).send();
  }
}

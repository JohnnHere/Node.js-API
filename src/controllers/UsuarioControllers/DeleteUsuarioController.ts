import { IDeleteUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("DeleteUsuarioController")
export class DeleteUsuarioController {
  constructor(
    @Inject("DeleteUsuarioService")
    private deleteUsuarioService: IDeleteUsuarioService
  ) { }

  async remover(req: Request, res: Response) {
    await this.deleteUsuarioService.remover(req.params.id);
    res.status(204).send();
  }
}

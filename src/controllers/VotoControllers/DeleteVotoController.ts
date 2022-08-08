import { IDeleteVotoService } from "../../@types/services/IVotoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("DeleteVotoController")
export class DeleteVotoController {
  constructor(
    @Inject("DeleteVotoService")
    private deleteVotoService: IDeleteVotoService
  ) {}

  async remover(req: Request, res: Response) {
    const { comentarioId, usuarioId } = req.body;

    await this.deleteVotoService.remover({ comentarioId, usuarioId });
    res.send();
  }
}

import { IDeleteVideoService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("DeleteVideoController")
export class DeleteVideoController {
  constructor(
    @Inject("DeleteVideoService")
    private deleteVideoService: IDeleteVideoService
  ) { }

  async remover(req: Request, res: Response) {
    await this.deleteVideoService.remover(req.params.id);

    res.status(204).send();
  }
}

import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IGetVideosSugeridosByVideoIdService } from "../../@types/services/IMateriaService";

@Service("GetVideosSugeridosByVideoIdController")
export class GetVideosSugeridosByVideoIdController {
  constructor(
    @Inject("GetVideosSugeridosByVideoIdService")
    private getVideosSugeridosByVideoIdController: IGetVideosSugeridosByVideoIdService
  ) {}

  async listarRecomendados(req: Request, res: Response) {
    const video =
      await this.getVideosSugeridosByVideoIdController.listarRecomendados(
        req.params.id
      );

    res.send(video);
  }
}

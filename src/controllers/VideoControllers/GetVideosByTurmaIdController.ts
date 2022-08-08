import { IGetVideosByTurmaIdService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { QueryVideosPorTurma } from "../../@types/dto/VideoDTO";

@Service("GetVideosByTurmaIdController")
export class GetVideosByTurmaIdController {
  constructor(
    @Inject("GetVideosByTurmaIdService")
    private getVideosByTurmaIdService: IGetVideosByTurmaIdService
  ) {}

  async listar(req: Request, res: Response) {
    const query = this.constroiQueryVideo(req);

    const videos = await this.getVideosByTurmaIdService.listar(query);

    res.send(videos);
  }

  private constroiQueryVideo(req: Request): QueryVideosPorTurma {
    return {
      turmaId: req.params.turmaId,
      nome: req.query.nome?.toString(),
      page: Number(req.query.page?.toString() ?? 0),
      per: Number(req.query.per?.toString() ?? 0),
      orderBy: req.query.orderBy?.toString(),
      orderDirection: req.query.orderDirection?.toString(),
    };
  }
}

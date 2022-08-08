import { IGetAllVideosService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { QueryVideos } from "../../@types/dto/VideoDTO";

@Service("GetAllVideosController")
export class GetAllVideosController {
  constructor(
    @Inject("GetAllVideosService")
    private getAllVideosService: IGetAllVideosService
  ) {}

  async listar(req: Request, res: Response) {
    const query = this.constroiQueryVideo(req);

    const videos = await this.getAllVideosService.listar(query);

    res.send(videos);
  }

  private constroiQueryVideo(req: Request): QueryVideos {
    return {
      nome: req.query.nome?.toString(),
      turma: req.query.turma?.toString(),
      page: Number(req.query.page?.toString() ?? 0),
      per: Number(req.query.per?.toString() ?? 0),
      orderBy: req.query.orderBy?.toString(),
      orderDirection: req.query?.orderDirection?.toString() as "ASC" | "DESC",
    };
  }
}

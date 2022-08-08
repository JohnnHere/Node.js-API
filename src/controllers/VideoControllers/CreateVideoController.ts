import { ICreateVideoService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CreateVideoController")
export class CreateVideoController {
  constructor(
    @Inject("CreateVideoService")
    private createVideoService: ICreateVideoService
  ) {}

  async criar(req: Request, res: Response) {
    const { turmaId, nome, descricao, arquivoDoVideo, imagemBanner } = req.body;

    const video = await this.createVideoService.criar({
      turmaId,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    });

    res.status(201).send(video);
  }
}

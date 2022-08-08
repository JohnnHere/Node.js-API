import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IUpdateVideoService } from "../../@types/services/IVideoService";

@Service("UpdateVideoController")
export class UpdateVideoController {
  constructor(
    @Inject("UpdateVideoService")
    private updateVideoService: IUpdateVideoService
  ) {}

  async atualizar(request: Request, response: Response) {
    const videoId = request.params.id;
    const { turmaId, nome, descricao, arquivoDoVideo, imagemBanner } =
      request.body;

    const video = await this.updateVideoService.atualizar(videoId, {
      turmaId,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    });

    response.send(video);
  }
}

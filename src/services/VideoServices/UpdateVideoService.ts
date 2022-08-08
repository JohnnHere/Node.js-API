import { VideoDTO } from "../../@types/dto/VideoDTO";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { Inject, Service } from "typedi";
import { Video } from "../../models/video";
import { IUpdateVideoService } from "../../@types/services/IVideoService";

@Service("UpdateVideoService")
export class UpdateVideoService implements IUpdateVideoService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}

  async atualizar(
    id: string,
    {
      turmaId,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    }: Partial<VideoDTO>
  ): Promise<Video> {
    const video = await this.videoRepository.atualizar(id, {
      turmaId,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    });

    if (video) {
      return video;
    }
  }
}

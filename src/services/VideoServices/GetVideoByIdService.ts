import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { IGetVideoByIdService } from "../../@types/services/IVideoService";
import { Video } from "../../models/video";
import { Inject, Service } from "typedi";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetVideoByIdService")
export class GetVideoById implements IGetVideoByIdService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}
  async buscar(id: string): Promise<Video> {
    const video = await this.videoRepository.buscar(id);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }

    return video;
  }
}

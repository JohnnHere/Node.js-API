import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { IDeleteVideoService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteVideoService")
export class DeleteVideoService implements IDeleteVideoService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}

  async remover(id: string): Promise<void> {
    const video = await this.videoRepository.buscar(id);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }

    await this.videoRepository.remover(id);
  }
}

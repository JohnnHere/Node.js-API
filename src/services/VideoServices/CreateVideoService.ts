import { ICreateVideoService } from "../../@types/services/IVideoService";
import { Inject, Service } from "typedi";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { VideoDTO } from "../../@types/dto/VideoDTO";
import { Video } from "../../models/video";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("CreateVideoService")
export class CreateVideoService implements ICreateVideoService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository
  ) {}

  async criar({
    turmaId,
    nome,
    descricao,
    arquivoDoVideo,
    imagemBanner,
  }: VideoDTO): Promise<Video> {
    if (!turmaId) {
      const video = await this.videoRepository.criar({
        nome,
        descricao,
        arquivoDoVideo,
        imagemBanner,
      });
      return video;
    } else {
      const turma = await this.turmaRepository.buscar(turmaId);
      if (!turma) {
        throw new NotFoundError("Turma não encontrada");
      }

      const video = await this.videoRepository.criar({
        turma,
        nome,
        descricao,
        arquivoDoVideo,
        imagemBanner,
      });
      return video;
    }
  }
}

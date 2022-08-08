import { IGetComentariosByVideoIdService } from "../../@types/services/IComentarioService";
import { Inject, Service } from "typedi";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { Comentario } from "../../models/comentario";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetComentariosByVideoIdService")
export class GetComentariosByVideoIdService
  implements IGetComentariosByVideoIdService
{
  constructor(
    @Inject("ComentarioRepository")
    private comentarioRepository: IComentarioRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}

  async listar(videoId: string): Promise<Comentario[]> {
    const video = await this.videoRepository.buscar(videoId);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }

    const comentarios = await this.comentarioRepository.listar(video);

    return comentarios;
  }
}

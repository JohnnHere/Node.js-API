import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { Inject, Service } from "typedi";
import { IGetVideosByTurmaIdService } from "../../@types/services/IVideoService";
import {
  QueryVideosPorTurma,
  RetornoListaVideos,
} from "../../@types/dto/VideoDTO";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetVideosByTurmaIdService")
export class GetVideosByTurmaIdService implements IGetVideosByTurmaIdService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository
  ) {}

  async listar(queryVideos: QueryVideosPorTurma): Promise<RetornoListaVideos> {
    const { turmaId } = queryVideos;

    const turma = await this.turmaRepository.buscar(turmaId);

    if (!turma) {
      throw new NotFoundError("Turma não encontrada");
    }

    const query = this.constroiQueryPadrao(queryVideos);
    const [videos, total] = await this.videoRepository.listarPorTurmaId(query);

    return {
      data: videos,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(query: QueryVideosPorTurma): QueryVideosPorTurma {
    return {
      turmaId: query.turmaId,
      nome: query.nome || "",
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "turma",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

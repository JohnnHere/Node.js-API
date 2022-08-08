import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { Inject, Service } from "typedi";
import { IGetAllVideosService } from "../../@types/services/IVideoService";
import { QueryVideos, RetornoListaVideos } from "../../@types/dto/VideoDTO";

@Service("GetAllVideosService")
export class GetAllVideosService implements IGetAllVideosService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}

  async listar(queryVideos: QueryVideos): Promise<RetornoListaVideos> {
    const query = this.constroiQueryPadrao(queryVideos);
    const [videos, total] = await this.videoRepository.listar(query);

    return {
      data: videos,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(query: QueryVideos): QueryVideos {
    return {
      nome: query.nome || "",
      turma: query.turma || "",
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "turma",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

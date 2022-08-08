import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { Inject, Service } from "typedi";
import { IGetVideosPublicosService } from "../../@types/services/IVideoService";
import {
  QueryVideosPublicos,
  RetornoListaVideos,
} from "../../@types/dto/VideoDTO";

@Service("GetVideosPublicosService")
export class GetVideosPublicosService implements IGetVideosPublicosService {
  constructor(
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) {}

  async listarVideosPublicos(
    queryVideosPublicos: QueryVideosPublicos
  ): Promise<RetornoListaVideos> {
    const query = this.constroiQueryPadrao(queryVideosPublicos);
    const [videos, total] = await this.videoRepository.listarVideosPublicos(
      query
    );

    return {
      data: videos,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(query: QueryVideosPublicos): QueryVideosPublicos {
    return {
      nome: query.nome || "",
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "nome",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

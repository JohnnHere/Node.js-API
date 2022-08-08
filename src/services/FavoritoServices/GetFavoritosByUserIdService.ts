import { Inject, Service } from "typedi";
import { IGetFavoritosByUserIdService } from "../../@types/services/IFavoritoService";
import { IFavoritoRepository } from "../../@types/repositories/IFavoritoRepository";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import {
  QueryFavoritosPorAluno,
  RetornoListaFavoritos,
} from "../../@types/dto/FavoritoDTO";

@Service("GetAllFavoritosByUserIdService")
export class GetFavoritosByUserIdService
  implements IGetFavoritosByUserIdService
{
  constructor(
    @Inject("FavoritoRepository")
    private favoritoRespository: IFavoritoRepository,
    @Inject("AlunoRepository") private alunoRespository: IAlunoRepository
  ) {}

  async listar(
    queryFavoritosPorAluno: QueryFavoritosPorAluno
  ): Promise<RetornoListaFavoritos> {
    const { alunoId } = queryFavoritosPorAluno;

    const aluno = await this.alunoRespository.buscarPorAlunoId(alunoId);

    if (!aluno) {
      throw new NotFoundError("O aluno informado não existe");
    }

    const query = this.constroiQueryPadrao(queryFavoritosPorAluno);
    const [favoritos, total] = await this.favoritoRespository.listar(query);

    return {
      data: favoritos,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(
    query: QueryFavoritosPorAluno
  ): QueryFavoritosPorAluno {
    return {
      alunoId: query.alunoId,
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "alunoId",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

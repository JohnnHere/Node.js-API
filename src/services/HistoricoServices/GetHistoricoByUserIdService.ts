import { Inject, Service } from "typedi";
import { IGetHistoricoByUserIdService } from "../../@types/services/IHistoricoService";
import { IHistoricoRepository } from "../../@types/repositories/IHistoricoRepository";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import {
  QueryHistoricoPorAluno,
  RetornoListaHistoricos,
} from "../../@types/dto/HistoricoDTO";

@Service("GetHistoricoByUserIdService")
export class GetHistoricoByUserIdService
  implements IGetHistoricoByUserIdService
{
  constructor(
    @Inject("HistoricoRepository")
    private historicoRespository: IHistoricoRepository,
    @Inject("AlunoRepository") private alunoRespository: IAlunoRepository
  ) {}

  async listar(
    queryHistoricoPorAluno: QueryHistoricoPorAluno
  ): Promise<RetornoListaHistoricos> {
    const { alunoId } = queryHistoricoPorAluno;

    const aluno = await this.alunoRespository.buscarPorAlunoId(alunoId);

    if (!aluno) {
      throw new NotFoundError("O aluno informado não existe");
    }

    const query = this.constroiQueryPadrao(queryHistoricoPorAluno);
    const [historicos, total] = await this.historicoRespository.listar(query);

    return {
      data: historicos,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(
    query: QueryHistoricoPorAluno
  ): QueryHistoricoPorAluno {
    return {
      alunoId: query.alunoId,
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "updatedAt",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

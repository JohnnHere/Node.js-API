import { Historico } from "../models/historico";
import { EntityRepository, Repository } from "typeorm";
import { IHistoricoRepository } from "../@types/repositories/IHistoricoRepository";
import {
  HistoricoDTO,
  QueryHistoricoPorAluno,
} from "../@types/dto/HistoricoDTO";

@EntityRepository(Historico)
export class HistoricoRepository
  extends Repository<Historico>
  implements IHistoricoRepository
{
  async adicionar({ videoId, alunoId }: HistoricoDTO): Promise<Historico> {
    const historico = await this.save({ videoId, alunoId });
    return historico;
  }

  async buscaHistorico({ videoId, alunoId }: HistoricoDTO): Promise<Historico> {
    const existeHistorico = await this.findOne({ where: { videoId, alunoId } });
    return existeHistorico;
  }

  async listar(query: QueryHistoricoPorAluno): Promise<[Historico[], number]> {
    const { alunoId, orderBy, orderDirection, page, per } = query;

    const [historicos, total] = await this.findAndCount({
      where: { alunoId },
      order: {
        [orderBy]: orderDirection,
      },
      skip: (page - 1) * per,
      take: per,
    });

    return [historicos, total];
  }

  async atualizaHistorico(historico: Historico): Promise<Historico> {
    historico.updatedAt = new Date();
    const historicoAtualizado = await this.save({ ...historico });
    return historicoAtualizado;
  }
}

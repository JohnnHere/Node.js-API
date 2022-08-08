import {
  HistoricoDTO,
  QueryHistoricoPorAluno,
} from "../../@types/dto/HistoricoDTO";
import { Repository } from "typeorm";
import { IHistoricoRepository } from "../../@types/repositories/IHistoricoRepository";
import { Historico } from "../../models/historico";

export class HistoricoRepositoryInMemory
  extends Repository<Historico>
  implements IHistoricoRepository
{
  historicos: Historico[];

  constructor() {
    super();
    this.historicos = [];
  }

  async adicionar({ videoId, alunoId }: HistoricoDTO): Promise<Historico> {
    const historico = new Historico();

    Object.assign(historico, { alunoId, videoId });

    this.historicos.push(historico);

    return historico;
  }

  async buscaHistorico({ videoId, alunoId }: HistoricoDTO): Promise<Historico> {
    return this.historicos.find(
      (historico) =>
        historico.videoId === videoId && historico.alunoId === alunoId
    );
  }

  async atualizaHistorico(historico: Historico): Promise<Historico> {
    const index = this.historicos.findIndex(
      (h) =>
        historico.alunoId === h.alunoId &&
        historico.alunoId === historico.alunoId
    );

    this.historicos[index] = historico;

    return this.historicos[index];
  }

  async listar(query: QueryHistoricoPorAluno): Promise<[Historico[], number]> {
    const aux: Historico[] = [];
    for (let i = 0; i < query.per; i++) {
      aux.push(this.historicos[i]);
    }

    return [aux, query.per];
  }
}

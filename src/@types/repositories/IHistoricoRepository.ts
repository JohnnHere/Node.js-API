import {
  HistoricoDTO,
  QueryHistoricoPorAluno,
} from "../../@types/dto/HistoricoDTO";
import { Historico } from "models/historico";
import { Repository } from "typeorm";

export interface IHistoricoRepository extends Repository<Historico> {
  adicionar({ videoId, alunoId }: HistoricoDTO): Promise<Historico>;
  buscaHistorico({ videoId, alunoId }: HistoricoDTO): Promise<Historico>;
  atualizaHistorico(historico: Historico): Promise<Historico>;
  listar(query: QueryHistoricoPorAluno): Promise<[Historico[], number]>;
}

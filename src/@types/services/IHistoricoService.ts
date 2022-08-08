import {
  HistoricoDTO,
  QueryHistoricoPorAluno,
  RetornoListaHistoricos,
} from "../../@types/dto/HistoricoDTO";
import { Historico } from "../../models/historico";

export interface IAddHistoricoService {
  adicionar({ videoId, alunoId }: HistoricoDTO): Promise<Historico>;
}
export interface IGetHistoricoByUserIdService {
  listar(
    queryHistoricoPorAluno: QueryHistoricoPorAluno
  ): Promise<RetornoListaHistoricos>;
}

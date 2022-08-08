import { AscDesc } from "../../@types/enums/AscDesc";
import { IsEnum } from "class-validator";
import { Pagination } from "../../@types/utils/Pagination";
import { Historico } from "../../models/historico";
import { ListMetadata } from "../../@types/utils/ListMetadata";

export interface HistoricoDTO {
  videoId: string;
  alunoId: string;
}
export class QueryHistoricoPorAluno implements Pagination {
  alunoId: string;
  page?: number;
  per?: number;
  orderBy?: string;

  @IsEnum(AscDesc)
  orderDirection?: string;
}

export class RetornoListaHistoricos {
  data: Historico[];
  meta: ListMetadata;
}

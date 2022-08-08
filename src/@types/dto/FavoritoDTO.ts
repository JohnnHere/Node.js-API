import { Pagination } from "../../@types/utils/Pagination";
import { ListMetadata } from "../../@types/utils/ListMetadata";
import { IsEnum } from "class-validator";
import { Favorito } from "../../models/favorito";
import { AscDesc } from "../../@types/enums/AscDesc";

export interface CreateFavoritoDTO {
  videoId: string;
  alunoId: string;
}

export class QueryFavoritosPorAluno implements Pagination {
  alunoId: string;
  page?: number;
  per?: number;
  orderBy?: string;

  @IsEnum(AscDesc)
  orderDirection?: string;
}

export class RetornoListaFavoritos {
  data: Favorito[];
  meta: ListMetadata;
}

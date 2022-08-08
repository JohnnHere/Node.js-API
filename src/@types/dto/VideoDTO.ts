import { ListMetadata } from "../../@types/utils/ListMetadata";
import { Video } from "../../models/video";
import { Pagination } from "../../@types/utils/Pagination";
import { Turma } from "../../models/turma";
import { IsEnum } from "class-validator";
import { AscDesc } from "../../@types/enums/AscDesc";

export interface VideoDTO {
  turmaId?: string;
  nome: string;
  descricao: string;
  arquivoDoVideo: string;
  imagemBanner: string;
}

export class RetornoListaVideos {
  data: Video[];
  meta: ListMetadata;
}

export class QueryVideosPublicos implements Pagination {
  nome?: string;
  page?: number;
  per?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
}

export class QueryVideos implements Pagination {
  nome?: string;
  turma?: string;
  page?: number;
  per?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
}

export class QueryVideosPorTurma implements Pagination {
  turmaId: string;
  nome?: string;
  page?: number;
  per?: number;
  orderBy?: string;

  @IsEnum(AscDesc)
  orderDirection?: string;
}

export interface CreateVideoDTO {
  turma?: Turma;
  nome: string;
  descricao: string;
  arquivoDoVideo: string;
  imagemBanner: string;
}

export interface RetornoVideoDTO {
  id: string;
  turmaId: string;
  nome: string;
  descricao: string;
  arquivoDoVideo: string;
  imagemBanner: string;
}

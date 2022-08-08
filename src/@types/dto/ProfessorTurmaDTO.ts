import { Pagination } from "../../@types/utils/Pagination";
import { ListMetadata } from "../../@types/utils/ListMetadata";
import { IsEnum } from "class-validator";
import { AscDesc } from "../../@types/enums/AscDesc";
import { Turma } from "../../models/turma";

export interface CreateProfessorTurmaDTO {
  professorId: string;
  turmaId: string;
}

export class QueryProfessorTurmas implements Pagination {
  professorId: string;
  nomeProfessor?: string;
  nomeTurma?: string;
  page?: number;
  per?: number;
  orderBy?: string;

  @IsEnum(AscDesc)
  orderDirection?: string;
}

export class RetornoListaProfessorTurmas {
  data: Turma[];
  meta: ListMetadata;
}

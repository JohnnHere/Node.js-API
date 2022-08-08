import {
  CreateProfessorTurmaDTO,
  QueryProfessorTurmas,
  RetornoListaProfessorTurmas,
} from "../../@types/dto/ProfessorTurmaDTO";
import { ProfessorTurma } from "../../models/professor_turma";

export interface ICreateProfessorTurmaService {
  criar({
    professorId,
    turmaId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma>;
}
export interface IDeleteProfessorTurmaService {
  remover({ professorId, turmaId }: CreateProfessorTurmaDTO): Promise<void>;
}
export interface IGetProfessorTurmaByProfessorIdService {
  listar(
    queryProfessorTurmas: QueryProfessorTurmas
  ): Promise<RetornoListaProfessorTurmas>;
}

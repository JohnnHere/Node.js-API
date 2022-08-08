import {
  CreateProfessorTurmaDTO,
  QueryProfessorTurmas,
} from "../dto/ProfessorTurmaDTO";
import { Repository } from "typeorm";
import { ProfessorTurma } from "../../models/professor_turma";

export interface IProfessorTurmaRepository extends Repository<ProfessorTurma> {
  criar({
    turmaId,
    professorId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma>;
  listar(query: QueryProfessorTurmas): Promise<[ProfessorTurma[], number]>;
  buscar({
    turmaId,
    professorId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma>;
  remover(ProfessorTurma: ProfessorTurma): Promise<void>;
}

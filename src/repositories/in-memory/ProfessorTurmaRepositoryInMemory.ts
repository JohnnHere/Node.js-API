import { IProfessorTurmaRepository } from "../../@types/repositories/IProfessorTurmaRepository";
import { ProfessorTurma } from "../../models/professor_turma";
import { Repository } from "typeorm";
import {
  CreateProfessorTurmaDTO,
  QueryProfessorTurmas,
} from "../../@types/dto/ProfessorTurmaDTO";

export class ProfessorTurmaRepositoryInMemory
  extends Repository<ProfessorTurma>
  implements IProfessorTurmaRepository
{
  professoresTurmas: ProfessorTurma[];

  constructor() {
    super();
    this.professoresTurmas = [];
  }

  async criar({
    turmaId,
    professorId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma> {
    const professorTurma = new ProfessorTurma();

    Object.assign(professorTurma, {
      professorId,
      turmaId,
    });

    this.professoresTurmas.push(professorTurma);

    return professorTurma;
  }

  async buscar({
    turmaId,
    professorId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma> {
    return this.professoresTurmas.find(
      (obj) => obj.professorId === professorId && obj.turmaId === turmaId
    );
  }

  async remover(ProfessorTurma: ProfessorTurma): Promise<void> {
    const aux = this.professoresTurmas.filter((obj) => obj !== ProfessorTurma);
    this.professoresTurmas = aux;
  }

  async listar(
    query: QueryProfessorTurmas
  ): Promise<[ProfessorTurma[], number]> {
    const aux: ProfessorTurma[] = [];
    for (let i = 0; i < query.per; i++) {
      aux.push(this.professoresTurmas[i]);
    }

    return [this.professoresTurmas, query.per];
  }
}

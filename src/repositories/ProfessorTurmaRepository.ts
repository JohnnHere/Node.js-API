import { IProfessorTurmaRepository } from "../@types/repositories/IProfessorTurmaRepository";
import { EntityRepository, Repository, ILike } from "typeorm";
import { ProfessorTurma } from "../models/professor_turma";
import {
  CreateProfessorTurmaDTO,
  QueryProfessorTurmas,
} from "../@types/dto/ProfessorTurmaDTO";

@EntityRepository(ProfessorTurma)
export class ProfessorTurmaRepository
  extends Repository<ProfessorTurma>
  implements IProfessorTurmaRepository
{
  async criar({
    professorId,
    turmaId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma> {
    const ProfessorTurma = await this.save({
      professorId,
      turmaId,
    });

    return ProfessorTurma;
  }

  async remover(ProfessorTurma: ProfessorTurma): Promise<void> {
    await this.remove(ProfessorTurma);
  }

  async listar(
    query: QueryProfessorTurmas
  ): Promise<[ProfessorTurma[], number]> {
    const { professorId, nomeTurma, orderBy, orderDirection, page, per } =
      query;

    const [professorTurmas, total] = await this.findAndCount({
      relations: ["professor", "turma"],
      where: {
        professorId,
        turma: { nome: ILike(`%${nomeTurma}%`) },
      },
      order: {
        [orderBy]: orderDirection,
      },
      skip: (page - 1) * per,
      take: per,
    });

    return [professorTurmas, total];
  }

  async buscar({
    professorId,
    turmaId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma> {
    const professorTurma = await this.findOne({
      where: { professorId, turmaId },
    });

    return professorTurma;
  }
}

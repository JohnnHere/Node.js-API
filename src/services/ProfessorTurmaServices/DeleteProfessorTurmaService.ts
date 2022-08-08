import { IProfessorTurmaRepository } from "../../@types/repositories/IProfessorTurmaRepository";
import { Inject, Service } from "typedi";
import { CreateProfessorTurmaDTO } from "../../@types/dto/ProfessorTurmaDTO";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IDeleteProfessorTurmaService } from "../../@types/services/IProfessorTurmaService";

@Service("DeleteProfessorTurmasService")
export class DeleteProfessorTurmasService
  implements IDeleteProfessorTurmaService
{
  constructor(
    @Inject("ProfessorTurmaRepository")
    private professorTurmaRespository: IProfessorTurmaRepository
  ) {}

  async remover({
    professorId,
    turmaId,
  }: CreateProfessorTurmaDTO): Promise<void> {
    const professorTurma = await this.professorTurmaRespository.buscar({
      professorId,
      turmaId,
    });

    if (!professorTurma) {
      throw new NotFoundError("Esse professor não está associado a essa turma");
    }

    await this.professorTurmaRespository.remover(professorTurma);
  }
}

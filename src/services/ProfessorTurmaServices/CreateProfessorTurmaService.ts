import { IProfessorTurmaRepository } from "../../@types/repositories/IProfessorTurmaRepository";
import { ProfessorTurma } from "../../models/professor_turma";
import { Inject, Service } from "typedi";
import { IProfessorRepository } from "../../@types/repositories/IProfessorRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { CreateProfessorTurmaDTO } from "../../@types/dto/ProfessorTurmaDTO";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { ICreateProfessorTurmaService } from "../../@types/services/IProfessorTurmaService";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("CreateProfessorTurmaService")
export class CreateProfessorTurmaService
  implements ICreateProfessorTurmaService
{
  constructor(
    @Inject("ProfessorTurmaRepository")
    private professorTurmaRepository: IProfessorTurmaRepository,
    @Inject("ProfessorRepository")
    private professorRepository: IProfessorRepository,
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async criar({
    professorId,
    turmaId,
  }: CreateProfessorTurmaDTO): Promise<ProfessorTurma> {
    const professorTurma = new ProfessorTurma();
    Object.assign(professorTurma, { professorId, turmaId });

    await this.validationService.validate(professorTurma);

    const professor = await this.professorRepository.buscar(professorId);
    const turma = await this.turmaRepository.buscar(turmaId);

    if (!professor) {
      throw new NotFoundError("Professor não encontrado");
    }
    if (!turma) {
      throw new NotFoundError("Turma não encontrada");
    }

    const novoProfessorTurma = await this.professorTurmaRepository.criar({
      professorId,
      turmaId,
    });

    return novoProfessorTurma;
  }
}

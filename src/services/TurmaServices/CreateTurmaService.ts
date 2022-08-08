import { ICreateTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { TurmaDTO } from "../../@types/dto/TurmaDTO";
import { Turma } from "../../models/turma";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("CreateTurmaService")
export class CreateTurmaService implements ICreateTurmaService {
  constructor(
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async criar({ nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma> {
    const turma = new Turma();
    Object.assign(turma, { nome, descricao, logoDoCurso });

    await this.validationService.validate(turma);

    const novaTurma = await this.turmaRepository.criar({
      nome,
      descricao,
      logoDoCurso,
    });

    return novaTurma;
  }
}

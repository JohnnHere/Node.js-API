import { IUpdateTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { TurmaDTO } from "../../@types/dto/TurmaDTO";
import { Turma } from "../../models/turma";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("UpdateTurmaService")
export class UpdateTurmaService implements IUpdateTurmaService {
  constructor(
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository
  ) {}

  async atualizar(
    id,
    { nome, descricao, logoDoCurso }: TurmaDTO
  ): Promise<Turma> {
    const turma = await this.turmaRepository.atualizar(id, {
      nome,
      descricao,
      logoDoCurso,
    });

    if (!turma) {
      throw new NotFoundError("Turma não encontrada");
    }

    return turma;

  }
}

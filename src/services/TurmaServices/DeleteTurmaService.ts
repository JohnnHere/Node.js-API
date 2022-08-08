import { IDeleteTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteTurmaService")
export class DeleteTurmaService implements IDeleteTurmaService {
  constructor(
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository
  ) {}

  async remover(id: string): Promise<void> {
    const turma = await this.turmaRepository.buscar(id);

    if (!turma) {
      throw new NotFoundError("Turma não encontrada");
    }

    await this.turmaRepository.remover(turma);
  }
}

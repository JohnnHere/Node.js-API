import { IGetTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetTurmaService")
export class GetTurmaService implements IGetTurmaService {
  constructor(
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository
  ) { }

  async buscar(id: string) {
    const turma = await this.turmaRepository.buscar(id);

    if (!turma) {
      throw new NotFoundError("Turma não encontrada");
    }

    return await turma;
  }
}

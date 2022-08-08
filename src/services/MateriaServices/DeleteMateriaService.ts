import { IMateriaRepository } from "../../@types/repositories/IMateriaRepository";
import { IDeleteMateriaService } from "../../@types/services/IMateriaService";
import { Inject, Service } from "typedi";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteMateriaService")
export class DeleteMateriaService implements IDeleteMateriaService {
  constructor(
    @Inject("MateriaRepository") private materiaRepository: IMateriaRepository
  ) {}

  async remover(id: string): Promise<void> {
    const materia = await this.materiaRepository.buscar(id);

    if (!materia) {
      throw new NotFoundError("Materia não encontrada");
    }

    await this.materiaRepository.remover(id);
  }
}

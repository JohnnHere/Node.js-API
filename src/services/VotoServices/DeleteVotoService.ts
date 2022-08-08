import { IVotoRepository } from "../../@types/repositories/IVotoRepository";
import { Inject, Service } from "typedi";
import { IDeleteVotoService } from "../../@types/services/IVotoService";
import { DeleteVotoDTO } from "../../@types/dto/VotoDTO";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteVotoService")
export class DeleteVotoService implements IDeleteVotoService {
  constructor(
    @Inject("VotoRepository") private votoRepository: IVotoRepository
  ) {}

  async remover({ comentarioId, usuarioId }: DeleteVotoDTO): Promise<void> {
    const voto = await this.votoRepository.buscaPorId({
      comentarioId,
      usuarioId,
    });

    if (!voto) {
      throw new NotFoundError("Voto não encontrado");
    }

    await this.votoRepository.remover(voto);
  }
}

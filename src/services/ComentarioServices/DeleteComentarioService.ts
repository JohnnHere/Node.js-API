import { IDeleteComentarioService } from "../../@types/services/IComentarioService";
import { Inject, Service } from "typedi";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("DeleteComentarioService")
export class DeleteComentarioService implements IDeleteComentarioService {
  constructor(
    @Inject("ComentarioRepository")
    private comentarioRepository: IComentarioRepository
  ) {}

  async remover(id: string): Promise<void> {
    const comentario = await this.comentarioRepository.buscar(id);

    if (!comentario) {
      throw new NotFoundError("Comentário não encontrado");
    }

    await this.comentarioRepository.remover(id);
  }
}

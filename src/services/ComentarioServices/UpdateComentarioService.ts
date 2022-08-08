import { IUpdateComentarioService } from "../../@types/services/IComentarioService";
import { Inject, Service } from "typedi";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { Comentario } from "../../models/comentario";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("UpdateComentarioService")
export class UpdateComentarioService implements IUpdateComentarioService {
  constructor(
    @Inject("ComentarioRepository")
    private comentarioRepository: IComentarioRepository
  ) {}

  async atualizar(
    id: string,
    { conteudo }: Partial<Comentario>
  ): Promise<Comentario> {
    const comentario = await this.comentarioRepository.atualizar(id, {
      conteudo,
    });
    if (!comentario) {
      throw new NotFoundError("Comentário não encontrado");
    }

    return comentario;

  }
}

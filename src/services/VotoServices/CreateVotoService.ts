import { ICreateVotoService } from "../../@types/services/IVotoService";
import { Inject, Service } from "typedi";
import { IVotoRepository } from "../../@types/repositories/IVotoRepository";
import { CreateVotoDTO } from "../../@types/dto/VotoDTO";
import { UsuarioVotaComentario } from "../../models/usuario_vota_comentario";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { ForbiddenError } from "../../@types/errors/ForbiddenError";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("CreateVotoService")
export class CreateVotoService implements ICreateVotoService {
  constructor(
    @Inject("VotoRepository") private votoRepository: IVotoRepository,
    @Inject("ComentarioRepository")
    private comentarioRepository: IComentarioRepository
  ) {}

  async criar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario> {
    const votoRepetido = await this.votoRepository.buscar({
      comentarioId,
      usuarioId,
      voto,
    });

    const comentario = await this.comentarioRepository.buscar(comentarioId);

    if (!comentario) {
      throw new NotFoundError("Comentário não encontrado");
    }

    if (votoRepetido) {
      throw new ForbiddenError(
        "O usuário não pode dar o mesmo tipo de voto duas vezes no mesmo comentário"
      );
    }

    if (voto) {
      comentario.numeroLikes += 1;
    } else {
      comentario.numeroDislikes += 1;
    }

    await this.comentarioRepository.atualizar(comentario.id, comentario);

    const novoVoto = await this.votoRepository.criar({
      comentarioId,
      usuarioId,
      voto,
    });

    return novoVoto;
  }
}

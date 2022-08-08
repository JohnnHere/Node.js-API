import { CreateVotoDTO } from "../@types/dto/VotoDTO";
import { IVotoRepository } from "../@types/repositories/IVotoRepository";
import { UsuarioVotaComentario } from "../models/usuario_vota_comentario";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsuarioVotaComentario)
export class VotoRepository
  extends Repository<UsuarioVotaComentario>
  implements IVotoRepository
{
  async criar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario> {
    const novoVoto = await this.save({
      comentarioId,
      usuarioId,
      voto,
    });
    return novoVoto;
  }

  async buscar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario> {
    const existeVoto = await this.findOne({
      where: { comentarioId, usuarioId, voto: voto },
    });

    return existeVoto;
  }

  async remover(voto: UsuarioVotaComentario): Promise<void> {
    await this.remove(voto);
  }

  async buscaPorId({
    comentarioId,
    usuarioId,
  }): Promise<UsuarioVotaComentario> {
    return await this.findOne({ where: { comentarioId, usuarioId } });
  }
}

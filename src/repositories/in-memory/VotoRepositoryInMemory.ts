import { IVotoRepository } from "../../@types/repositories/IVotoRepository";
import { UsuarioVotaComentario } from "../../models/usuario_vota_comentario";
import { CreateVotoDTO } from "../../@types/dto/VotoDTO";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";

export class VotoRepositoryInMemory
  extends Repository<UsuarioVotaComentario>
  implements IVotoRepository
{
  votos: UsuarioVotaComentario[];

  constructor() {
    super();
    this.votos = [];
  }

  async criar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario> {
    const novoVoto = new UsuarioVotaComentario();

    Object.assign(novoVoto, {
      id: randomUUID(),
      comentarioId,
      usuarioId,
      voto,
    });

    this.votos.push(novoVoto);

    return novoVoto;
  }

  async buscar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario> {
    return this.votos.find((v) => {
      return (
        v.comentarioId === comentarioId &&
        v.usuarioId === usuarioId &&
        v.voto === voto
      );
    });
  }

  async buscaPorId({
    comentarioId,
    usuarioId,
  }): Promise<UsuarioVotaComentario> {
    return this.votos.find((v) => {
      return v.comentarioId === comentarioId && v.usuarioId === usuarioId;
    });
  }

  async remover(voto: UsuarioVotaComentario): Promise<void> {
    const aux = this.votos.filter((v) => v !== voto);
    this.votos = aux;
  }
}

import { Comentario } from "../../models/comentario";
import { Video } from "../../models/video";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { CreateComentarioDTO } from "../../@types/dto/ComentarioDTO";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";

export class ComentarioRepositoryInMemory
  extends Repository<Comentario>
  implements IComentarioRepository
{
  comentarios: Comentario[];

  constructor() {
    super();
    this.comentarios = [];
  }

  async criar({
    video,
    usuario,
    conteudo,
  }: CreateComentarioDTO): Promise<Comentario> {
    const comentario = new Comentario();

    Object.assign(comentario, {
      id: randomUUID(),
      video,
      usuario,
      conteudo,
    });

    this.comentarios.push(comentario);

    return comentario;
  }

  async remover(id: string): Promise<void> {
    const aux = this.comentarios.filter((comentario) => comentario.id !== id);
    this.comentarios = aux;
  }

  async buscar(id: string): Promise<Comentario> {
    return this.comentarios.find((comentario) => comentario.id === id);
  }

  async listar(video: Video): Promise<Comentario[]> {
    return this.comentarios.filter((comentario) => comentario.video === video);
  }

  async atualizar(
    id: string,
    { video, usuario, conteudo }: Partial<Comentario>
  ): Promise<Comentario> {
    const index = this.comentarios.findIndex(
      (comentario) => comentario.id === id
    );

    const numeroLikes = 0;
    const numeroDislikes = 0;
    const usuarioVotaComentarios = null;
    const createdAt = new Date();
    const updatedAt = new Date();

    this.comentarios[index] = {
      id,
      video,
      usuario,
      conteudo,
      numeroLikes,
      numeroDislikes,
      usuarioVotaComentarios,
      createdAt,
      updatedAt,
    };

    return this.comentarios[index];
  }
}

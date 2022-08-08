import { IComentarioRepository } from "../@types/repositories/IComentarioRepository";
import { Comentario } from "../models/comentario";
import { EntityRepository, Repository } from "typeorm";
import { CreateComentarioDTO } from "../@types/dto/ComentarioDTO";
import { Video } from "../models/video";

@EntityRepository(Comentario)
export class ComentarioRepository
  extends Repository<Comentario>
  implements IComentarioRepository
{
  async criar({
    video,
    usuario,
    conteudo,
  }: CreateComentarioDTO): Promise<Comentario> {
    const comentario = await this.save({ video, usuario, conteudo });
    return comentario;
  }

  async remover(id: string): Promise<void> {
    const comentario = await this.buscar(id);
    await this.remove(comentario);
  }

  async buscar(id: string): Promise<Comentario> {
    const comentario = await this.findOne({ where: { id } });
    return comentario;
  }

  async listar(video: Video): Promise<Comentario[]> {
    const comentarios = await this.find({ where: { video } });
    return comentarios;
  }

  async atualizar(
    id: string,
    {
      video,
      usuario,
      conteudo,
      numeroDislikes,
      numeroLikes,
    }: Partial<Comentario>
  ): Promise<Comentario> {
    const comentario = await this.buscar(id);

    comentario.conteudo = conteudo ?? comentario.conteudo;
    comentario.usuario = usuario ?? comentario.usuario;
    comentario.video = video ?? comentario.video;
    comentario.numeroDislikes = numeroDislikes;
    comentario.numeroLikes = numeroLikes;
    return this.save(comentario);
  }
}

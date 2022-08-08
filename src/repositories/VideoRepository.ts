import { IVideoRepository } from "../@types/repositories/IVideoRepository";
import { Video } from "../models/video";
import { EntityRepository, Repository, ILike } from "typeorm";
import {
  CreateVideoDTO,
  QueryVideos,
  QueryVideosPorTurma,
  QueryVideosPublicos,
  VideoDTO,
} from "../@types/dto/VideoDTO";

@EntityRepository(Video)
export class VideoRepository
  extends Repository<Video>
  implements IVideoRepository
{
  async atualizar(
    id: string,
    {
      turmaId,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    }: Partial<VideoDTO>
  ): Promise<Video> {
    const video = await this.buscar(id);
    video.turma.id = turmaId ?? video.turma.id;
    video.nome = nome ?? video.nome;
    video.descricao = descricao ?? video.descricao;
    video.arquivoDoVideo = arquivoDoVideo ?? video.arquivoDoVideo;
    video.imagemBanner = imagemBanner ?? video.imagemBanner;
    return this.save(video);
  }

  async criar({
    turma,
    nome,
    descricao,
    arquivoDoVideo,
    imagemBanner,
  }: CreateVideoDTO): Promise<Video> {
    const video = await this.save({
      turma,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    });
    return video;
  }

  async buscar(id: string): Promise<Video> {
    const video = await this.findOne({
      where: { id },
      relations: ["turma"],
    });
    return video;
  }

  async remover(id: string): Promise<void> {
    const video = await this.buscar(id);
    await this.remove(video);
  }

  async listar(query: QueryVideos): Promise<[Video[], number]> {
    const { nome, turma, orderBy, orderDirection, page, per } = query;

    const videos = await this.createQueryBuilder("video")
      .leftJoinAndSelect("video.turma", "turma")
      .where("video.nome LIKE :nome", { nome: `%${nome}%` })
      .andWhere("turma.nome LIKE :turma", { turma: `%${turma}%` })
      .orderBy(`${orderBy}.nome`, orderDirection)
      .skip((page - 1) * per)
      .take(per)
      .getMany();
    const total = videos.length;
    return [videos, total];
  }

  async listarVideosPublicos(
    query: QueryVideosPublicos
  ): Promise<[Video[], number]> {
    const { nome, orderBy, orderDirection, page, per } = query;
    const videos = await this.createQueryBuilder("video")
      .leftJoinAndSelect("video.turma", "turma")
      .where("video.nome LIKE :nome", { nome: `%${nome}%` })
      .andWhere("turma.id IS NULL")
      .orderBy(`video.${orderBy}`, orderDirection)
      .skip((page - 1) * per)
      .take(per)
      .getMany();
    const total = videos.length;
    return [videos, total];
  }

  async listarPorTurmaId(
    query: QueryVideosPorTurma
  ): Promise<[Video[], number]> {
    const { turmaId, nome, orderBy, orderDirection, page, per } = query;
    const [videos, total] = await this.findAndCount({
      where: {
        nome: ILike(`%${nome}%`),
        turma: { id: turmaId },
      },
      order: {
        [orderBy]: orderDirection,
      },
      skip: (page - 1) * per,
      take: per,
      relations: ["turma"],
    });
    return [videos, total];
  }
}

import { Video } from "../../models/video";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import {
  CreateVideoDTO,
  QueryVideos,
  QueryVideosPorTurma,
  QueryVideosPublicos,
  VideoDTO,
} from "../../@types/dto/VideoDTO";
import { Turma } from "../../models/turma";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";

export class VideoRepositoryInMemory
  extends Repository<Video>
  implements IVideoRepository
{
  videos: Video[];

  constructor() {
    super();
    this.videos = [];
  }

  async criar({
    turma,
    nome,
    descricao,
    arquivoDoVideo,
    imagemBanner,
  }: CreateVideoDTO): Promise<Video> {
    const video = new Video();

    Object.assign(video, {
      id: randomUUID(),
      turma,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
    });

    this.videos.push(video);

    return video;
  }

  async buscar(id: string): Promise<Video> {
    return this.videos.find((video) => video.id === id);
  }

  async remover(id: string): Promise<void> {
    const aux = this.videos.filter((video) => video.id !== id);
    this.videos = aux;
  }

  async atualizar(
    id: string,
    { nome, descricao, arquivoDoVideo, imagemBanner }: Partial<VideoDTO>
  ): Promise<Video> {
    const index = this.videos.findIndex((video) => video.id === id);

    const comentarios = [];
    const favoritos = [];
    const historicos = [];
    const materias = [];
    const createdAt = new Date();
    const updatedAt = new Date();
    const turma = new Turma();

    this.videos[index] = {
      id,
      turma,
      nome,
      descricao,
      arquivoDoVideo,
      imagemBanner,
      comentarios,
      favoritos,
      historicos,
      materias,
      createdAt,
      updatedAt,
    };

    return this.videos[index];
  }

  async listar(query: QueryVideos): Promise<[Video[], number]> {
    const aux: Video[] = [];
    for (let i = 0; i < query.per; i++) {
      aux.push(this.videos[i]);
    }

    return [this.videos, query.per];
  }

  async listarPorTurmaId(
    query: QueryVideosPorTurma
  ): Promise<[Video[], number]> {
    const aux: Video[] = [];
    for (let i = 0; i < query.per; i++) {
      if (this.videos[i].turma.id === query.turmaId) {
        aux.push(this.videos[i]);
      }
    }

    return [aux, query.per];
  }

  async listarVideosPublicos(
    query: QueryVideosPublicos
  ): Promise<[Video[], number]> {
    const aux: Video[] = [];
    for (let i = 0; i < query.per; i++) {
      aux.push(this.videos[i]);
    }

    return [aux, query.per];
  }
}

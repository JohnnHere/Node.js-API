import { Video } from "../../models/video";
import {
  QueryVideos,
  QueryVideosPorTurma,
  QueryVideosPublicos,
  RetornoListaVideos,
  VideoDTO,
} from "../dto/VideoDTO";

export interface ICreateVideoService {
  criar({
    turmaId,
    nome,
    descricao,
    arquivoDoVideo,
    imagemBanner,
  }: VideoDTO): Promise<Video>;
}

export interface IDeleteVideoService {
  remover(id: string): Promise<void>;
}

export interface IGetAllVideosService {
  listar(queryVideos: QueryVideos): Promise<RetornoListaVideos>;
}
export interface IGetVideosPublicosService {
  listarVideosPublicos(
    queryVideos: QueryVideosPublicos
  ): Promise<RetornoListaVideos>;
}
export interface IGetVideosByTurmaIdService {
  listar(queryVideos: QueryVideosPorTurma): Promise<RetornoListaVideos>;
}

export interface IGetVideoByIdService {
  buscar(id: string): Promise<Video>;
}

export interface IUpdateVideoService {
  atualizar(
    id: string,
    {
      turmaId,
      nome,
      arquivoDoVideo,
      descricao,
      imagemBanner,
    }: Partial<VideoDTO>
  ): Promise<Video>;
}

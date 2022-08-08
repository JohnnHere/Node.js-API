import {
  CreateVideoDTO,
  QueryVideos,
  QueryVideosPorTurma,
  QueryVideosPublicos,
  VideoDTO,
} from "../dto/VideoDTO";
import { Video } from "../../models/video";
import { Repository } from "typeorm";

export interface IVideoRepository extends Repository<Video> {
  criar({
    turma,
    nome,
    descricao,
    arquivoDoVideo,
    imagemBanner,
  }: CreateVideoDTO): Promise<Video>;
  buscar(id: string): Promise<Video>;
  remover(id: string): Promise<void>;
  listar(query: QueryVideos): Promise<[Video[], number]>;
  atualizar(
    id: string,
    { turmaId, nome, descricao, imagemBanner }: Partial<VideoDTO>
  ): Promise<Video>;
  listarPorTurmaId(query: QueryVideosPorTurma): Promise<[Video[], number]>;
  listarVideosPublicos(query: QueryVideosPublicos): Promise<[Video[], number]>;
}

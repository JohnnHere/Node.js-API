import { Video } from "../../models/video";

export interface CreateMateriaDTO {
  video: Video;
  nome: string;
}

export interface MateriaDTO {
  videoId: string;
  nome: string;
}

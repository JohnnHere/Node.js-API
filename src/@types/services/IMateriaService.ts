import { MateriaDTO } from "../dto/MateriaDTO";
import { Materia } from "../../models/materia";
import { Video } from "../../models/video";

export interface IGetVideosSugeridosByVideoIdService {
  listarRecomendados(videoId: string): Promise<Video[]>;
}

export interface ICreateMateriaService {
  criar({ videoId, nome }: MateriaDTO): Promise<Materia>;
}

export interface IDeleteMateriaService {
  remover(id: string): Promise<void>;
}

export interface IGetAllMateriasService {
  listar(): Promise<Materia[]>;
}

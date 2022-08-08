import { CreateMateriaDTO } from "../dto/MateriaDTO";
import { Repository } from "typeorm";
import { Materia } from "../../models/materia";

export interface IMateriaRepository extends Repository<Materia> {
  listarRecomendados(videoId: string): Promise<Materia[]>;
  criar({ video, nome }: CreateMateriaDTO): Promise<Materia>;
  buscar(id: string): Promise<Materia>;
  remover(id: string): Promise<void>;
  listar(): Promise<Materia[]>;
}

import { IMateriaRepository } from "../../@types/repositories/IMateriaRepository";
import { Materia } from "../../models/materia";
import { Inject, Service } from "typedi";
import { IGetAllMateriasService } from "../../@types/services/IMateriaService";

@Service("GetAllMateriasService")
export class GetAllMateriasService implements IGetAllMateriasService {
  constructor(
    @Inject("MateriaRepository") private materiaRepository: IMateriaRepository
  ) {}

  async listar(): Promise<Materia[]> {
    return this.materiaRepository.listar();
  }
}

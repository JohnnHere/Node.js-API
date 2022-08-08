import { IMateriaRepository } from "../../@types/repositories/IMateriaRepository";
import { CreateMateriaDTO } from "../../@types/dto/MateriaDTO";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { Materia } from "../../models/materia";

export class MateriaRepositoryInMemory
  extends Repository<Materia>
  implements IMateriaRepository
{
  materias: Materia[];

  constructor() {
    super();
    this.materias = [];
  }

  async criar({ video, nome }: CreateMateriaDTO): Promise<Materia> {
    const novaMateria = new Materia();

    Object.assign(novaMateria, {
      id: randomUUID(),
      video,
      nome,
    });

    this.materias.push(novaMateria);

    return novaMateria;
  }

  async buscar(id: string): Promise<Materia> {
    return this.materias.find((m) => m.id === id);
  }

  async listar(): Promise<Materia[]> {
    return this.materias;
  }

  async remover(id: string): Promise<void> {
    const aux = this.materias.filter((m) => m.id !== id);
    this.materias = aux;
  }

  async listarRecomendados(): Promise<Materia[]> {
    return this.materias;
  }
}

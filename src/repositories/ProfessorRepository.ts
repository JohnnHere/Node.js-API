import { EntityRepository, Repository } from "typeorm";
import { Professor } from "../models/professor";
import { IProfessorRepository } from "../@types/repositories/IProfessorRepository";
import { CreateProfessorDTO } from "../@types/dto/ProfessorDTO";

@EntityRepository(Professor)
export class ProfessorRepository
  extends Repository<Professor>
  implements IProfessorRepository
{
  async cadastrar({ usuario }: CreateProfessorDTO) {
    return this.save({ usuario });
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Professor> {
    const professor = await this.findOne({ where: { usuario: usuarioId } });
    return professor;
  }

  async buscar(id: string): Promise<Professor> {
    const professor = await this.findOne({ where: { id } });
    return professor;
  }

  async remover(professor: Professor): Promise<void> {
    await this.remove(professor);
  }
}

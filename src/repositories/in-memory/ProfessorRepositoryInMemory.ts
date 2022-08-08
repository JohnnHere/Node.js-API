import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { Professor } from "../../models/professor";
import { IProfessorRepository } from "../../@types/repositories/IProfessorRepository";
import { CreateProfessorDTO } from "../../@types/dto/ProfessorDTO";

export class ProfessorRepositoryInMemory
  extends Repository<Professor>
  implements IProfessorRepository
{
  professores: Professor[];

  constructor() {
    super();
    this.professores = [];
  }

  async cadastrar({ usuario }: CreateProfessorDTO): Promise<Professor> {
    const professor = new Professor();

    Object.assign(professor, {
      id: randomUUID(),
      email: usuario.email,
      nome: usuario.nome,
      fotoPerfil: usuario.fotoPerfil,
      senha: usuario.senha,
      usuario,
    });

    this.professores.push(professor);

    return professor;
  }

  async buscar(id: string): Promise<Professor> {
    return this.professores.find((professor) => professor.id === id);
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Professor> {
    return this.professores.find(
      (professor) => professor.usuario.id === usuarioId
    );
  }

  async remover(professor: Professor): Promise<void> {
    const aux = this.professores.filter((p) => p !== professor);
    this.professores = aux;
  }
}

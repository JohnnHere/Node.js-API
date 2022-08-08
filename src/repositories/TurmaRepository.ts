import { ITurmaRepository } from "../@types/repositories/ITurmaRepository";
import { Turma } from "../models/turma";
import { EntityRepository, Repository } from "typeorm";
import { TurmaDTO } from "../@types/dto/TurmaDTO";

@EntityRepository(Turma)
export class TurmaRepository
  extends Repository<Turma>
  implements ITurmaRepository
{
  async criar({ nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma> {
    return this.save({
      nome,
      descricao,
      logoDoCurso,
    });
  }

  async remover(turma: Turma): Promise<void> {
    await this.softDelete(turma);
  }

  async buscar(id: string): Promise<Turma> {
    return await this.findOne({ where: { id } });
  }

  async atualizar(
    id: string,
    { nome, descricao, logoDoCurso }: TurmaDTO
  ): Promise<Turma> {
    const turma = await this.buscar(id);
    turma.nome = nome ?? turma.nome;
    turma.descricao = descricao ?? turma.descricao;
    turma.logoDoCurso = logoDoCurso ?? turma.logoDoCurso;
    return this.save(turma);
  }

  async listar(): Promise<Turma[]> {
    return await this.find();
  }
}

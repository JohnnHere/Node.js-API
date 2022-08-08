import { TurmaDTO } from "../../@types/dto/TurmaDTO";
import { Repository } from "typeorm";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { Turma } from "../../models/turma";
import { randomUUID } from "crypto";

export class TurmaRepositoryInMemory
  extends Repository<Turma>
  implements ITurmaRepository
{
  turmas: Turma[];

  constructor() {
    super();
    this.turmas = [];
  }

  async criar({ nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma> {
    const turma = new Turma();

    Object.assign(turma, { id: randomUUID(), nome, descricao, logoDoCurso });

    this.turmas.push(turma);

    return turma;
  }

  async atualizar(
    id,
    { nome, descricao, logoDoCurso }: TurmaDTO
  ): Promise<Turma> {
    const index = this.turmas.findIndex((video) => video.id === id);

    const professorTurmas = [];
    const alunos = [];
    const videos = [];
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();

    this.turmas[index] = {
      id,
      nome,
      descricao,
      logoDoCurso,
      professorTurmas,
      alunos,
      videos,
      createdAt,
      updatedAt,
      deletedAt,
    };

    return this.turmas[index];
  }

  async buscar(id: string): Promise<Turma> {
    return this.turmas.find((turma) => turma.id === id);
  }

  async remover(turmao: Turma): Promise<void> {
    await this.turmas.filter((turma) => turma.id === turmao.id);
  }

  async listar(): Promise<Turma[]> {
    return this.turmas;
  }
}

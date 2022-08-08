import { TurmaDTO } from "../dto/TurmaDTO";
import { Turma } from "../../models/turma";
import { Repository } from "typeorm";

export interface ITurmaRepository extends Repository<Turma> {
  criar({ nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma>;
  atualizar(id, { nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma>;
  buscar(id: string): Promise<Turma>;
  remover(turma: Turma): Promise<void>;
  listar(): Promise<Turma[]>;
}

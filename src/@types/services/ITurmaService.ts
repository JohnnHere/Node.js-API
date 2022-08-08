import { Turma } from "../../models/turma";
import { TurmaDTO } from "../dto/TurmaDTO";

export interface ICreateTurmaService {
  criar({ nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma>;
}

export interface IListTurmaService {
  listar(): Promise<Turma[]>;
}

export interface IGetTurmaService {
  buscar(id: string): Promise<Turma>;
}

export interface IUpdateTurmaService {
  atualizar(id, { nome, descricao, logoDoCurso }: TurmaDTO): Promise<Turma>;
}

export interface IDeleteTurmaService {
  remover(id: string): Promise<void>;
}

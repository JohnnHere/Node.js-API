import { Repository } from "typeorm";
import { Aluno } from "../../models/aluno";
import { CadastrarAlunoDTO } from "../dto/AlunoDTO";

export interface IAlunoRepository extends Repository<Aluno> {
  cadastrar({ usuario, turma }: CadastrarAlunoDTO): Promise<Aluno>;
  buscar(usuarioId: string): Promise<Aluno>;
  buscarPorAlunoId(alunoId: string): Promise<Aluno>;
  remover(aluno: Aluno): Promise<void>
}

import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { CadastrarAlunoDTO } from "../../@types/dto/AlunoDTO";
import { Aluno } from "../../models/aluno";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";

export class AlunoRepositoryInMemory
  extends Repository<Aluno>
  implements IAlunoRepository
{
  alunos: Aluno[];

  constructor() {
    super();
    this.alunos = [];
  }

  async cadastrar({ usuario, turma }: CadastrarAlunoDTO): Promise<Aluno> {
    const aluno = new Aluno();

    Object.assign(aluno, {
      id: randomUUID(),
      turma,
      email: usuario.email,
      nome: usuario.nome,
      fotoPerfil: usuario.fotoPerfil,
      senha: usuario.senha,
      usuario,
    });

    this.alunos.push(aluno);

    return aluno;
  }

  async buscar(id: string): Promise<Aluno> {
    return this.alunos.find((aluno) => aluno.usuario.id === id);
  }

  async buscarPorAlunoId(alunoId: string): Promise<Aluno> {
    return this.alunos.find((aluno) => aluno.id === alunoId);
  }

  async remover(aluno: Aluno): Promise<void> {
    const aux = this.alunos.filter((a) => a !== aluno);
    this.alunos = aux;
  }
}

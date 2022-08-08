import { EntityRepository, Repository } from "typeorm";
import { Aluno } from "../models/aluno";
import { IAlunoRepository } from "../@types/repositories/IAlunoRepository";
import { CadastrarAlunoDTO } from "../@types/dto/AlunoDTO";

@EntityRepository(Aluno)
export class AlunoRepository
  extends Repository<Aluno>
  implements IAlunoRepository {
  async cadastrar({ usuario, turma }: CadastrarAlunoDTO): Promise<Aluno> {
    const aluno = await this.save({ usuario, turma });
    return aluno;
  }

  async buscar(usuarioId: string): Promise<Aluno> {
    const aluno = await this.findOne({ where: { usuario: usuarioId } });
    return aluno;
  }

  async buscarPorAlunoId(alunoId: string): Promise<Aluno> {
    const aluno = await this.findOne({ where: { id: alunoId } });
    return aluno;
  }

  async remover(aluno: Aluno): Promise<void> {
    await this.remove(aluno);
  }
}

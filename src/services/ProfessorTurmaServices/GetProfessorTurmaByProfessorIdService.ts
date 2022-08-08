import { Inject, Service } from "typedi";
import { IGetProfessorTurmaByProfessorIdService } from "../../@types/services/IProfessorTurmaService";
import { IProfessorTurmaRepository } from "../../@types/repositories/IProfessorTurmaRepository";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import {
  QueryProfessorTurmas,
  RetornoListaProfessorTurmas,
} from "../../@types/dto/ProfessorTurmaDTO";

@Service("GetProfessorTurmaByProfessorIdService")
export class GetProfessorTurmaByProfessorIdService
  implements IGetProfessorTurmaByProfessorIdService
{
  constructor(
    @Inject("ProfessorTurmaRepository")
    private favoritoRespository: IProfessorTurmaRepository,
    @Inject("ProfessorRepository")
    private professorRespository: IAlunoRepository
  ) {}

  async listar(
    queryProfessorTurma: QueryProfessorTurmas
  ): Promise<RetornoListaProfessorTurmas> {
    const { professorId } = queryProfessorTurma;

    const professor = await this.professorRespository.findOne({
      where: { id: professorId },
    });

    if (!professor) {
      throw new NotFoundError("O professor informado não existe");
    }

    const query = this.constroiQueryPadrao(queryProfessorTurma);

    const [favoritos, total] = await this.favoritoRespository.listar(query);

    const turmas = favoritos.map((favorito) => favorito.turma);

    return {
      data: turmas,
      meta: {
        page: query.page,
        per: query.per,
        total: total,
      },
    };
  }

  private constroiQueryPadrao(
    query: QueryProfessorTurmas
  ): QueryProfessorTurmas {
    return {
      professorId: query.professorId,
      nomeProfessor: query.nomeProfessor || "",
      nomeTurma: query.nomeTurma || "",
      page: query.page > 0 ? query.page : 1,
      per: query.per > 0 ? query.per : 20,
      orderBy: query.orderBy || "professorId",
      orderDirection: query.orderDirection || "ASC",
    };
  }
}

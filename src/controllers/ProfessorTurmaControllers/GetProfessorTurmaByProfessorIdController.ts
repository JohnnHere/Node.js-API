import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IGetProfessorTurmaByProfessorIdService } from "../../@types/services/IProfessorTurmaService";
import { QueryProfessorTurmas } from "../../@types/dto/ProfessorTurmaDTO";

@Service("GetProfessorTurmaByProfessorIdController")
export class GetProfessorTurmaByProfessorIdController {
  constructor(
    @Inject("GetProfessorTurmaByProfessorIdService")
    private getProfessorTurmaByProfessorIdService: IGetProfessorTurmaByProfessorIdService
  ) {}

  async listar(req: Request, res: Response) {
    const query = this.constroiQueryProfessorTurma(req);

    const turmas = await this.getProfessorTurmaByProfessorIdService.listar(
      query
    );

    res.send(turmas);
  }

  private constroiQueryProfessorTurma(req: Request): QueryProfessorTurmas {
    return {
      professorId: req.params.professorId,
      nomeProfessor: req.query.nomeProfessor?.toString(),
      nomeTurma: req.query.nomeTurma?.toString(),
      page: Number(req.query.page?.toString() ?? 0),
      per: Number(req.query.per?.toString() ?? 0),
      orderBy: req.query.orderBy?.toString(),
      orderDirection: req.query.orderDirection?.toString(),
    };
  }
}

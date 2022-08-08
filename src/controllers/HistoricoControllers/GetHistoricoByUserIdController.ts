import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IGetHistoricoByUserIdService } from "../../@types/services/IHistoricoService";
import { QueryHistoricoPorAluno } from "../../@types/dto/HistoricoDTO";

@Service("GetHistoricoByUserIdController")
export class GetHistoricoByUserIdController {
  constructor(
    @Inject("GetHistoricoByUserIdService")
    private getHistoricoByUserIdService: IGetHistoricoByUserIdService
  ) {}

  async listar(req: Request, res: Response) {
    const query = this.constroiQueryHistorico(req);

    const historicos = await this.getHistoricoByUserIdService.listar(query);

    res.send(historicos);
  }

  private constroiQueryHistorico(req: Request): QueryHistoricoPorAluno {
    return {
      alunoId: req.params.alunoId,
      page: Number(req.query.page?.toString() ?? 0),
      per: Number(req.query.per?.toString() ?? 0),
      orderBy: req.query.orderBy?.toString(),
      orderDirection: req.query.orderDirection?.toString(),
    };
  }
}

import { IAddHistoricoService } from "../../@types/services/IHistoricoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("AddHistoricoController")
export class AddHistoricoController {
  constructor(
    @Inject("AddHistoricoService")
    private addHistoricoService: IAddHistoricoService
  ) {}

  async adicionar(req: Request, res: Response) {
    const { videoId, alunoId } = req.body;

    const historico = await this.addHistoricoService.adicionar({
      videoId,
      alunoId,
    });

    res.status(201).send(historico);
  }
}

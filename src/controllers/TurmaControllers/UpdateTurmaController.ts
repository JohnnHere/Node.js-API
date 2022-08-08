import { IUpdateTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("UpdateTurmaController")
export class UpdateTurmaController {
  constructor(
    @Inject("UpdateTurmaService")
    private updateTurmaService: IUpdateTurmaService
  ) {}

  async atualizar(request: Request, response: Response) {
    const turmaId = request.params.id;
    const { nome, descricao, logoDoCurso } = request.body;

    const turma = await this.updateTurmaService.atualizar(turmaId, {
      nome,
      descricao,
      logoDoCurso,
    });

    response.send(turma);
  }
}

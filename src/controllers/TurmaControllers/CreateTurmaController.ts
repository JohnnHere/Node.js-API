import { ICreateTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CreateTurmaController")
export class CreateTurmaController {
  constructor(
    @Inject("CreateTurmaService")
    private createTurmaService: ICreateTurmaService
  ) {}

  async criar(request: Request, response: Response) {
    const { nome, descricao, logoDoCurso } = request.body;

    const turma = await this.createTurmaService.criar({
      nome,
      descricao,
      logoDoCurso,
    });

    response.status(201).send(turma);
  }
}

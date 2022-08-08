import { IGetTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("GetTurmaController")
export class GetTurmaController {
  constructor(
    @Inject("GetTurmaService")
    private getTurmaService: IGetTurmaService
  ) {}

  async get(request: Request, response: Response) {
    const turma = await this.getTurmaService.buscar(String(request.params.id));

    response.send(turma);
  }
}

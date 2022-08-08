import { IDeleteTurmaService } from "../../@types/services/ITurmaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("DeleteTurmaController")
export class DeleteTurmaController {
  constructor(
    @Inject("DeleteTurmaService")
    private deleteTurmaService: IDeleteTurmaService
  ) { }

  async remove(request: Request, response: Response) {
    await this.deleteTurmaService.remover(String(request.params.id));
    response.status(204).send();
  }
}

import { Inject, Service } from "typedi";
import { IProfessorTurmaRepository } from "../../@types/repositories/IProfessorTurmaRepository";
import { Request, Response } from "express";

@Service("DeleteProfessorTurmaController")
export class DeleteProfessorTurmaController {
  constructor(
    @Inject("DeleteProfessorTurmasService")
    private deleteProfessorTurmaService: IProfessorTurmaRepository
  ) {}

  async remover(req: Request, res: Response) {
    await this.deleteProfessorTurmaService.remover(req.body);

    res.status(204).send();
  }
}

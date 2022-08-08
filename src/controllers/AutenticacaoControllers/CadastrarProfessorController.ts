import { ICreateUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CadastrarProfessorController")
export class CadastrarProfessorController {
  constructor(
    @Inject("CadastrarProfessorService")
    private cadastrarProfessorService: ICreateUsuarioService
  ) {}

  async cadastrar(req: Request, res: Response) {
    const professor = await this.cadastrarProfessorService.cadastrar(req.body);

    res.status(201).send(professor);
  }
}

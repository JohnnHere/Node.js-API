import { ICadastrarAlunoService } from "../../@types/services/IAutenticacaoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CadastrarAlunoController")
export class CadastrarAlunoController {
  constructor(
    @Inject("CadastrarAlunoService")
    private cadastrarAlunoService: ICadastrarAlunoService
  ) {}

  async cadastrar(req: Request, res: Response) {
    const aluno = await this.cadastrarAlunoService.cadastrar(req.body);

    res.status(201).send(aluno);
  }
}

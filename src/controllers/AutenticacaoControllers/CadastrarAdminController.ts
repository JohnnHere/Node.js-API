import { ICadastrarService } from "../../@types/services/IAutenticacaoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CadastrarAdminController")
export class CadastrarAdminController {
  constructor(
    @Inject("CadastrarAdminService")
    private cadastrarAdminService: ICadastrarService
  ) {}

  async cadastrar(req: Request, res: Response) {
    const admin = await this.cadastrarAdminService.cadastrar(req.body);

    res.status(201).send(admin);
  }
}

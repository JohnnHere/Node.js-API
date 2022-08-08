import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { EnviaEmailComCodigoService } from "../../services/EmailServices/EnviaEmailComCodigoService";

@Service("EnviaEmailComCodigoController")
export class EnviaEmailComCodigoController {
  constructor(
    @Inject("EnviaEmailComCodigoService")
    private enviaEmailComCodigoService: EnviaEmailComCodigoService
  ) {}

  async sendMail(req: Request, res: Response) {
    const { emailAluno, emailOrigem, assunto, codigoAcesso } = req.body;

    this.enviaEmailComCodigoService.sendMail({
      emailAluno,
      emailOrigem,
      assunto,
      codigoAcesso,
    });

    res.send();
  }
}

import { IEmailClient, SendMailDTO } from "../../clients/EmailClient";
import { Inject, Service } from "typedi";
import { IEnviaEmailComCodigoService } from "../../@types/services/IEnviaEmailComCodigoService";

@Service("EnviaEmailComCodigoService")
export class EnviaEmailComCodigoService implements IEnviaEmailComCodigoService {
  constructor(@Inject("EmailClient") private emailClient: IEmailClient) {}

  async sendMail({
    emailAluno,
    emailOrigem,
    assunto,
    codigoAcesso,
  }: SendMailDTO): Promise<void> {
    const msg = `
    <h1>Bem vindo(a) à Raro Academy!</h1>
    🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳
    <p>Aqui está seu código de acesso para realizar seu cadastro: <strong>${codigoAcesso}</strong></p>
    `;

    this.emailClient.sendMail({
      to: emailAluno,
      from: emailOrigem,
      subject: assunto,
      html: msg,
    });
  }
}

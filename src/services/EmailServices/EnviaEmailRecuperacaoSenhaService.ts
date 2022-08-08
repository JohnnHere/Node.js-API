import {
  IEmailClient,
  SendMailRecuperacaoDTO,
} from "../../clients/EmailClient";
import { Inject, Service } from "typedi";
import { gerarTokenComTimer } from "../../helpers/Token";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { checaTipoUsuario } from "../../helpers/checaTipoUsuario";
import { IEnviaEmailRecuperacaoSenhaService } from "../../@types/services/IEnviaEmailRecuperacaoSenhaService";

@Service("EnviaEmailRecuperacaoSenhaService")
export class EnviaEmailRecuperacaoSenhaService
  implements IEnviaEmailRecuperacaoSenhaService
{
  constructor(
    @Inject("EmailClient") private emailClient: IEmailClient,
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async sendMail({
    emailAluno,
    emailOrigem,
    assunto,
  }: SendMailRecuperacaoDTO): Promise<void> {
    const usuario = await this.usuarioRepository.buscar(emailAluno);

    const tipoUsuario = checaTipoUsuario(usuario);

    const objToken = gerarTokenComTimer({
      id: usuario.id,
      tipoUsuario,
    });

    const msg = `
    <h1>Redefinição de senha!</h1>
    <p>Aqui está seu código para realizar a mudança de senha: <strong>${objToken.token}</strong></p>
    `;

    this.emailClient.sendMail({
      to: emailAluno,
      from: emailOrigem,
      subject: assunto,
      html: msg,
    });
  }
}

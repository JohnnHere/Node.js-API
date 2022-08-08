import { SendMailRecuperacaoDTO } from "../../clients/EmailClient";

export interface IEnviaEmailRecuperacaoSenhaService {
  sendMail({
    emailAluno,
    emailOrigem,
    assunto,
  }: SendMailRecuperacaoDTO): Promise<void>;
}

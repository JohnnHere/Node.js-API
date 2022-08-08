import { SendMailDTO } from "../../clients/EmailClient";

export interface IEmailClient {
  sendMail({
    emailAluno,
    emailOrigem,
    assunto,
    codigoAcesso,
  }: SendMailDTO): Promise<void>;
}

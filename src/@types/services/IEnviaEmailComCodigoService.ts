import { SendMailDTO } from "../../clients/EmailClient";

export interface IEnviaEmailComCodigoService {
  sendMail({
    emailAluno,
    emailOrigem,
    assunto,
    codigoAcesso,
  }: SendMailDTO): Promise<void>;
}

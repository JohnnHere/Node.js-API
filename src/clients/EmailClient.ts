import { Service } from "typedi";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface SendMailDTO {
  emailAluno: string;
  emailOrigem: string;
  assunto: string;
  codigoAcesso: string;
}

export interface SendMailRecuperacaoDTO {
  emailAluno: string;
  emailOrigem: string;
  assunto: string;
}

export interface MailDTO {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export interface IEmailClient {
  sendMail({ to, from, subject, html }: MailDTO): void;
}

@Service("EmailClient")
export class EmailClient implements IEmailClient {
  async sendMail({ to, from, subject, html }: MailDTO): Promise<void> {
    await sgMail.send({ to, from, subject, html });
  }
}

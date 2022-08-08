import { UnprocessableEntityError } from "./UnprocessableEntityError";

export class EmailJaCadastrado extends UnprocessableEntityError {
  public name: string;
  constructor() {
    super("Email já cadastrado no sistema");
    this.name = "EmailJaCadastrado";
  }
}

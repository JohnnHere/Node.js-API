import { UnprocessableEntityError } from "./UnprocessableEntityError";

export class SenhaInvalida extends UnprocessableEntityError {
  public name: string;
  constructor() {
    super("A senha não atende aos requisitos");
    this.name = "SenhaInvalida";
  }
}

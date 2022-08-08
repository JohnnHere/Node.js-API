export interface LoginDTO {
  email: string;
  senha: string;
}

export interface TokenUsuarioDTO {
  id: string;
  tipoUsuario: TipoUsuario;
}

export enum TipoUsuario {
  admin = "admin",
  professor = "professor",
  aluno = "aluno",
}

export interface RetornoAutenticacaoDTO {
  token: string;
  tipoUsuario: TipoUsuario;
}

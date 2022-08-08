export interface UsuarioDTO {
  email: string;
  nome: string;
  fotoPerfil: string;
  senha: string;
}

export interface UpdateUsuarioDTO {
  email: string;
  nome: string;
  fotoPerfil: string;
}

export interface RetornoCadastroUsuarioDTO {
  id: string;
  email: string;
  nome: string;
  fotoPerfil: string;
}

import { RetornoAutenticacaoDTO } from "../dto/AutenticacaoDTO";
import { UsuarioDTO, RetornoCadastroUsuarioDTO } from "../dto/UsuarioDTO";
import { CreateAlunoDTO } from "../dto/AlunoDTO";

export interface ILoginService {
  autenticar(email: string, senha: string): Promise<RetornoAutenticacaoDTO>;
}

export interface ICadastrarService {
  cadastrar(usuario: UsuarioDTO): Promise<RetornoCadastroUsuarioDTO>;
}

export interface ICadastrarAlunoService {
  cadastrar(usuario: CreateAlunoDTO): Promise<RetornoCadastroUsuarioDTO>;
}

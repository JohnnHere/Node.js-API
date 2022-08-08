import {
  RetornoAutenticacaoDTO,
  TipoUsuario,
} from "../../@types/dto/AutenticacaoDTO";
import { Inject, Service } from "typedi";
import { UsuarioOuSenhaInvalidos } from "../../@types/errors/UsuarioOuSenhaInvalidos";
import { gerarToken } from "../../helpers/Token";
import { hashSenha } from "../../helpers/HashSenha";
import { ILoginService } from "../../@types/services/IAutenticacaoService";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";

@Service("LoginService")
export class LoginService implements ILoginService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async autenticar(
    email: string,
    senha: string
  ): Promise<RetornoAutenticacaoDTO> {
    const usuarioCadastrado = await this.usuarioRepository.buscar(email);

    if (!usuarioCadastrado) {
      throw new UsuarioOuSenhaInvalidos();
    }

    if (usuarioCadastrado.senha !== hashSenha(senha)) {
      throw new UsuarioOuSenhaInvalidos();
    }

    let tipoUsuario: TipoUsuario;

    if (usuarioCadastrado.professor) {
      tipoUsuario = TipoUsuario.professor;
    }

    if (usuarioCadastrado.aluno) {
      tipoUsuario = TipoUsuario.aluno;
    }

    if (usuarioCadastrado.admin) {
      tipoUsuario = TipoUsuario.admin;
    }

    return gerarToken({
      id: usuarioCadastrado.id,
      tipoUsuario,
    });
  }
}

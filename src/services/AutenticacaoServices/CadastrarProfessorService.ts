import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import {
  RetornoCadastroUsuarioDTO,
  UsuarioDTO,
} from "../../@types/dto/UsuarioDTO";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { hashSenha } from "../../helpers/HashSenha";
import { ICadastrarService } from "../../@types/services/IAutenticacaoService";
import { IProfessorRepository } from "../../@types/repositories/IProfessorRepository";
import { IValidationService } from "../../@types/services/IValidationService";
import { Usuario } from "../../models/usuario";

@Service("CadastrarProfessorService")
export class CadastrarProfessorService implements ICadastrarService {
  constructor(
    @Inject("ProfessorRepository")
    private professorRepository: IProfessorRepository,
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async cadastrar({
    email,
    nome,
    fotoPerfil,
    senha,
  }: UsuarioDTO): Promise<RetornoCadastroUsuarioDTO> {
    const hash = hashSenha(senha);

    const usuarioCadastrado = await this.usuarioRepository.buscar(email);

    if (usuarioCadastrado) {
      throw new EmailJaCadastrado();
    }

    const usuario = new Usuario();
    Object.assign(usuario, { email, nome, fotoPerfil, senha: hash });

    await this.validationService.validate(usuario);

    const novoUsuario = await this.usuarioRepository.cadastrar({
      email,
      nome,
      fotoPerfil,
      senha: hash,
    });

    await this.professorRepository.cadastrar({ usuario: novoUsuario });

    return { id: novoUsuario.id, email, nome, fotoPerfil };
  }
}

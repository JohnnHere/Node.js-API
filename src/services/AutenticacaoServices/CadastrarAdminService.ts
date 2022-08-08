import { ICreateUsuarioService } from "../../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import {
  RetornoCadastroUsuarioDTO,
  UsuarioDTO,
} from "../../@types/dto/UsuarioDTO";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { hashSenha } from "../../helpers/HashSenha";
import { IAdminRepository } from "../../@types/repositories/IAdminRepository";
import { IValidationService } from "../../@types/services/IValidationService";
import { Usuario } from "../../models/usuario";

@Service("CadastrarAdminService")
export class CadastrarAdminService implements ICreateUsuarioService {
  constructor(
    @Inject("AdminRepository")
    private adminRepository: IAdminRepository,
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
    await this.adminRepository.criar({ usuario: novoUsuario });

    return { id: novoUsuario.id, email, nome, fotoPerfil };
  }
}

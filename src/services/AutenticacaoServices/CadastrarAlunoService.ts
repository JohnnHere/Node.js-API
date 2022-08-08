import { CreateAlunoDTO } from "../../@types/dto/AlunoDTO";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { ITurmaRepository } from "../../@types/repositories/ITurmaRepository";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { Inject, Service } from "typedi";
import { RetornoCadastroUsuarioDTO } from "../../@types/dto/UsuarioDTO";
import { ICadastrarAlunoService } from "../../@types/services/IAutenticacaoService";
import { hashSenha } from "../../helpers/HashSenha";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IValidationService } from "../../@types/services/IValidationService";
import { Usuario } from "../../models/usuario";

@Service("CadastrarAlunoService")
export class CadastrarAlunoService implements ICadastrarAlunoService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository,
    @Inject("AlunoRepository") private alunoRepository: IAlunoRepository,
    @Inject("TurmaRepository") private turmaRepository: ITurmaRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async cadastrar({
    email,
    nome,
    fotoPerfil,
    senha,
    turmaId,
  }: CreateAlunoDTO): Promise<RetornoCadastroUsuarioDTO> {
    const hash = hashSenha(senha);

    const alunoCadastrado = await this.usuarioRepository.buscar(email);

    if (alunoCadastrado) {
      throw new EmailJaCadastrado();
    }

    const usuario = new Usuario();
    Object.assign(usuario, { email, nome, fotoPerfil, senha: hash });

    await this.validationService.validate(usuario);

    const turmaDoAluno = await this.turmaRepository.buscar(turmaId);

    if (!turmaDoAluno) {
      throw new NotFoundError("Turma não encontrada");
    }

    const novoUsuario = await this.usuarioRepository.cadastrar({
      email,
      nome,
      fotoPerfil,
      senha: hash,
    });

    await this.alunoRepository.cadastrar({
      usuario: novoUsuario,
      turma: turmaDoAluno,
    });

    return {
      id: novoUsuario.id,
      email: novoUsuario.email,
      nome: novoUsuario.nome,
      fotoPerfil: novoUsuario.fotoPerfil,
    };
  }
}

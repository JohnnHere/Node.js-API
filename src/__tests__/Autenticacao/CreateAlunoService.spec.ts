import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { ValidationService } from "../../services/utils/ValidationService";
import { CadastrarAlunoService } from "../../services/AutenticacaoServices/CadastrarAlunoService";
import * as dotenv from "dotenv";

dotenv.config();

let cadastrarAlunoService: CadastrarAlunoService;
let usuarioRepository: UsuarioRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let validationService: ValidationService;

describe("CreateAlunoService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    alunoRepository = new AlunoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    validationService = new ValidationService();

    cadastrarAlunoService = new CadastrarAlunoService(
      usuarioRepository,
      alunoRepository,
      turmaRepository,
      validationService
    );
  });

  it("Deve ser criado um novo aluno", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const aluno = await cadastrarAlunoService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
      turmaId: turma.id,
    });

    expect(aluno).toMatchObject({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
    });
  });

  it("Deve retornar o erro que o email já esta cadastrado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    await cadastrarAlunoService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
      turmaId: turma.id,
    });

    const emailJaCadastrado = await cadastrarAlunoService
      .cadastrar({
        email: "email@email.com",
        nome: "Felipe",
        fotoPerfil: "./upload/42380523yhr",
        senha: "123456",
        turmaId: turma.id,
      })
      .catch((error) => error);

    expect(emailJaCadastrado).toBeInstanceOf(EmailJaCadastrado);
  });

  it("Deve retornar que o usuario da turma não existe", async () => {
    turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const erroTurmaId = await cadastrarAlunoService
      .cadastrar({
        email: "email@email.com",
        nome: "Matheus",
        fotoPerfil: "./upload/42380523yhr",
        senha: "123456",
        turmaId: "321",
      })
      .catch((error) => error);
    expect(erroTurmaId).toBeInstanceOf(NotFoundError);
  });
});

import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { AdminRepositoryInMemory } from "../../repositories/in-memory/AdminRepositoryInMemory";
import { ProfessorRepositoryInMemory } from "../../repositories/in-memory/ProfessorRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { LoginService } from "../../services/AutenticacaoServices/LoginService";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UsuarioOuSenhaInvalidos } from "../../@types/errors/UsuarioOuSenhaInvalidos";
import { CadastrarAlunoService } from "../../services/AutenticacaoServices/CadastrarAlunoService";
import { CadastrarProfessorService } from "../../services/AutenticacaoServices/CadastrarProfessorService";
import { CadastrarAdminService } from "../../services/AutenticacaoServices/CadastrarAdminService";
import { ValidationService } from "../../services/utils/ValidationService";

import * as dotenv from "dotenv";

dotenv.config();

let loginService: LoginService;
let usuarioRepository: UsuarioRepositoryInMemory;
let adminRepository: AdminRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let professorRepository: ProfessorRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let cadastrarProfessorService: CadastrarProfessorService;
let cadastrarAlunoService: CadastrarAlunoService;
let cadastrarAdminService: CadastrarAdminService;
let validationService: ValidationService;

describe("LoginService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    alunoRepository = new AlunoRepositoryInMemory();
    professorRepository = new ProfessorRepositoryInMemory();
    adminRepository = new AdminRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    validationService = new ValidationService();

    loginService = new LoginService(usuarioRepository);

    cadastrarProfessorService = new CadastrarProfessorService(
      professorRepository,
      usuarioRepository,
      validationService
    );

    cadastrarAlunoService = new CadastrarAlunoService(
      usuarioRepository,
      alunoRepository,
      turmaRepository,
      validationService
    );

    cadastrarAdminService = new CadastrarAdminService(
      adminRepository,
      usuarioRepository,
      validationService
    );
  });

  it("Um professor deve ser logado", async () => {
    const professor = await cadastrarProfessorService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const login = await loginService.autenticar(professor.email, "123456");

    expect(login.tipoUsuario).toBe("professor");
  });

  it("Um aluno deve ser logado", async () => {
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

    const login = await loginService.autenticar(aluno.email, "123456");

    expect(login.tipoUsuario).toBe("aluno");
  });

  it("Um admin deve ser logado", async () => {
    const admin = await cadastrarAdminService.cadastrar({
      email: "emailew3@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/423820523yhr",
      senha: "123456",
    });

    const login = await loginService.autenticar(admin.email, "123456");

    expect(login.tipoUsuario).toBe("admin");
  });

  it("Deve retornar o erro de usuario ou senha invalidos", async () => {
    const login = await loginService
      .autenticar("123", "123456")
      .catch((error) => error);

    expect(login).toBeInstanceOf(UsuarioOuSenhaInvalidos);
  });

  it("Deve retornar o erro de usuario ou senha invalidos", async () => {
    const professor = await cadastrarProfessorService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const login = await loginService
      .autenticar(professor.email, "123")
      .catch((error) => error);

    expect(login).toBeInstanceOf(UsuarioOuSenhaInvalidos);
  });
});

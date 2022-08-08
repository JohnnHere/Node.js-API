import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { ProfessorRepositoryInMemory } from "../../repositories/in-memory/ProfessorRepositoryInMemory";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { ValidationService } from "../../services/utils/ValidationService";
import { CadastrarProfessorService } from "../../services/AutenticacaoServices/CadastrarProfessorService";
import * as dotenv from "dotenv";

dotenv.config();

let cadastrarProfessorService: CadastrarProfessorService;
let usuarioRepository: UsuarioRepositoryInMemory;
let professorRepository: ProfessorRepositoryInMemory;
let validationService: ValidationService;

describe("CreateProfessorService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    professorRepository = new ProfessorRepositoryInMemory();
    validationService = new ValidationService();

    cadastrarProfessorService = new CadastrarProfessorService(
      professorRepository,
      usuarioRepository,
      validationService
    );
  });

  it("Deve ser criado um novo professor", async () => {
    const professor = await cadastrarProfessorService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    expect(professor).toMatchObject({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
    });
  });

  it("Deve retornar o erro que o email já esta cadastrado", async () => {
    await cadastrarProfessorService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const emailJaCadastrado = await cadastrarProfessorService
      .cadastrar({
        email: "email@email.com",
        nome: "Felipe",
        fotoPerfil: "./upload/42380523yhr",
        senha: "123456",
      })
      .catch((error) => error);

    expect(emailJaCadastrado).toBeInstanceOf(EmailJaCadastrado);
  });
});

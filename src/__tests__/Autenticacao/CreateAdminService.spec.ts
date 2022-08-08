import { CadastrarAdminService } from "../../services/AutenticacaoServices/CadastrarAdminService";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { AdminRepositoryInMemory } from "../../repositories/in-memory/AdminRepositoryInMemory";
import { EmailJaCadastrado } from "../../@types/errors/EmailJaCadastrado";
import { ValidationService } from "../../services/utils/ValidationService";
import * as dotenv from "dotenv";

dotenv.config();

let cadastrarAdminService: CadastrarAdminService;
let usuarioRepository: UsuarioRepositoryInMemory;
let adminRepository: AdminRepositoryInMemory;
let validationService: ValidationService;

describe("CreateAdminService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    adminRepository = new AdminRepositoryInMemory();
    validationService = new ValidationService();

    cadastrarAdminService = new CadastrarAdminService(
      adminRepository,
      usuarioRepository,
      validationService
    );
  });

  it("Deve ser criado um novo admin", async () => {
    const admin = await cadastrarAdminService.cadastrar({
      email: "email2@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    expect(admin).toMatchObject({
      email: "email2@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
    });
  });

  it("Deve retornar o erro que o email já esta cadastrado", async () => {
    await cadastrarAdminService.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const emailJaCadastrado = await cadastrarAdminService
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

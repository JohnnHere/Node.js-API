import { NotFoundError } from "../../@types/errors/NotFoundError";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { GetUsuarioService } from "../../services/UsuarioServices/GetUsuarioService";

let usuarioRepository: UsuarioRepositoryInMemory;
let getUsuarioService: GetUsuarioService;

describe("GetUsuarioService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();

    getUsuarioService = new GetUsuarioService(usuarioRepository);
  });

  it("Deve buscar um usuário", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const usuarioEncontrado = await getUsuarioService.buscar(usuario.id);

    expect(usuarioEncontrado).toMatchObject({
      id: usuarioEncontrado.id,
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
    });
  });

  it("Um usuário não deve ser encontrado", async () => {
    const usuarioEncontrado = await getUsuarioService
      .buscar("123")
      .catch((error) => error);

    expect(usuarioEncontrado).toBeInstanceOf(NotFoundError);
  });
});

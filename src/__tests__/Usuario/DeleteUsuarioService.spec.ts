import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { DeleteUsuarioService } from "../../services/UsuarioServices/DeleteUsuarioService";

let usuarioRepository: UsuarioRepositoryInMemory;
let deleteUsuarioService: DeleteUsuarioService;

describe("DeleteUsuarioService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();

    deleteUsuarioService = new DeleteUsuarioService(usuarioRepository);
  });

  it("Um usuário deve ser deletado", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    await deleteUsuarioService.remover(usuario.id);

    expect(await usuarioRepository.buscarPorId(usuario.id)).toBe(undefined);
  });

  it("Deve retornar o erro de usuário não encontrado", async () => {
    const usuarioDeletado = await deleteUsuarioService
      .remover("123")
      .catch((error) => error);

    expect(usuarioDeletado).toBeInstanceOf(NotFoundError);
  });
});

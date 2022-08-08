import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { UpdateUsuarioService } from "../../services/UsuarioServices/UpdateUsuarioService";

let usuarioRepository: UsuarioRepositoryInMemory;
let updateUsuarioService: UpdateUsuarioService;

describe("UpdateUsuarioService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();

    updateUsuarioService = new UpdateUsuarioService(usuarioRepository);
  });

  it("Um usuário deve ser alterado", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const usuarioAlterado = await updateUsuarioService.atualizar(usuario.id, {
      email: "matheus@email.com",
      nome: "Matheus Pereira",
      fotoPerfil: "./upload/fotoperfil",
    });

    expect(usuarioAlterado.email).toBe("matheus@email.com");
    expect(usuarioAlterado.nome).toBe("Matheus Pereira");
    expect(usuarioAlterado.fotoPerfil).toBe("./upload/fotoperfil");
  });

  it("Deve retornar o erro de usuário não encontrado", async () => {
    const usuarioAlterado = await updateUsuarioService
      .atualizar("123", {
        email: "matheus@email.com",
        nome: "Matheus Pereira",
        fotoPerfil: "./upload/fotoperfil",
      })
      .catch((error) => error);

    expect(usuarioAlterado).toBeInstanceOf(NotFoundError);
  });
});

import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { ListUsuarioService } from "../../services/UsuarioServices/ListUsuarioService";

let usuarioRepository: UsuarioRepositoryInMemory;
let listUsuarioService: ListUsuarioService;

describe("ListUsuarioService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();

    listUsuarioService = new ListUsuarioService(usuarioRepository);
  });

  it("Deve retornar a lista de usuários", async () => {
    const usuario1 = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const usuario2 = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const usuarios = await listUsuarioService.listar();

    expect(usuarios[0]).toMatchObject(usuario1);
    expect(usuarios[1]).toMatchObject(usuario2);
  });
});

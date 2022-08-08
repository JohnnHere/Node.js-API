import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { ComentarioRepositoryInMemory } from "../../repositories/in-memory/ComentarioRepositoryInMemory";
import { DeleteComentarioService } from "../../services/ComentarioServices/DeleteComentarioService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteComentarioService: DeleteComentarioService;
let videoRepository: VideoRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let comentarioRepository: ComentarioRepositoryInMemory;

describe("DeleteComentarioService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();
    comentarioRepository = new ComentarioRepositoryInMemory();

    deleteComentarioService = new DeleteComentarioService(comentarioRepository);
  });

  it("Um comentário deve ser deletado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video = await videoRepository.criar({
      turma,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const comentario = await comentarioRepository.criar({
      video,
      usuario,
      conteudo: "Gostei do vídeo",
    });

    await deleteComentarioService.remover(comentario.id);

    expect(await comentarioRepository.buscar(comentario.id)).toBe(undefined);
  });

  it("Deve não encontrar um comentário", async () => {
    const error = await deleteComentarioService
      .remover("123")
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

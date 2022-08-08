import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UpdateComentarioService } from "../../services/ComentarioServices/UpdateComentarioService";
import { ComentarioRepositoryInMemory } from "../../repositories/in-memory/ComentarioRepositoryInMemory";

let updateComentarioService: UpdateComentarioService;
let videoRepository: VideoRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let comentarioRepository: ComentarioRepositoryInMemory;

describe("UpdateComentarioService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();
    comentarioRepository = new ComentarioRepositoryInMemory();

    updateComentarioService = new UpdateComentarioService(comentarioRepository);
  });

  it("Um comentário deve ser atualizado", async () => {
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
      conteudo: "Ótimo vídeo",
    });

    await updateComentarioService.atualizar(comentario.id, {
      conteudo: "Não gostei do vídeo",
    });

    const comentarioAtualizado = await comentarioRepository.buscar(
      comentario.id
    );

    expect(comentarioAtualizado.conteudo).toBe("Não gostei do vídeo");
    expect(comentarioAtualizado.id).toBe(comentario.id);
  });
});

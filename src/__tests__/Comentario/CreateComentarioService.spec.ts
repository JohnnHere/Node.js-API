import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { ComentarioRepositoryInMemory } from "../../repositories/in-memory/ComentarioRepositoryInMemory";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { CreateComentarioService } from "../../services/ComentarioServices/CreateComentarioService";
import { ValidationService } from "../../services/utils/ValidationService";

let createComentarioService: CreateComentarioService;
let videoRepository: VideoRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let comentarioRepository: ComentarioRepositoryInMemory;
let validationService: ValidationService;

describe("CreateComentarioService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();
    comentarioRepository = new ComentarioRepositoryInMemory();
    validationService = new ValidationService();

    createComentarioService = new CreateComentarioService(
      comentarioRepository,
      videoRepository,
      usuarioRepository,
      validationService
    );
  });

  it("Um comentário deve ser criado", async () => {
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

    const comentario = await createComentarioService.criar({
      videoId: video.id,
      usuarioId: usuario.id,
      conteudo: "Gostei do vídeo",
    });

    expect(comentario.conteudo).toBe("Gostei do vídeo");
    expect(comentario.video.id).toBe(video.id);
  });

  it("Deve retornar o erro de video não encontrado", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const comentario = await createComentarioService
      .criar({
        videoId: "123",
        usuarioId: usuario.id,
        conteudo: "Ótimo vídeo",
      })
      .catch((error) => error);

    expect(comentario).toBeInstanceOf(NotFoundError);
  });

  it("Deve retornar o erro de usuário não encontrado", async () => {
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

    const comentario = await createComentarioService
      .criar({
        videoId: video.id,
        usuarioId: "123",
        conteudo: "Ótimo vídeo",
      })
      .catch((error) => error);

    expect(comentario).toBeInstanceOf(NotFoundError);
  });
});

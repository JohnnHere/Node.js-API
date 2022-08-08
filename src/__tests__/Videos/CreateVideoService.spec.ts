import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { CreateVideoService } from "../../services/VideoServices/CreateVideoService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let createVideoService: CreateVideoService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;

describe("CreateVideoService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();

    createVideoService = new CreateVideoService(
      videoRepository,
      turmaRepository
    );
  });

  it("Deve ser criado um novo vídeo", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video = await createVideoService.criar({
      turmaId: turma.id,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    expect(video).toMatchObject({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    expect(video.turma.id).toBe(turma.id);
  });

  it("Deve ser criado um video sem turma id", async () => {
    await createVideoService.criar({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });
  });

  it("Não deveria criar o video se não achar a turma", async () => {
    const error = await createVideoService
      .criar({
        turmaId: "123",
        nome: "Git/Git Flow",
        descricao:
          "O video aborda os principais comandos git e a importância de usar o gitflow",
        arquivoDoVideo: "./upload/42380523yhr2304238f2",
        imagemBanner: "./upload/34jkrf2j3kfma04ds",
      })
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { GetVideoById } from "../../services/VideoServices/GetVideoByIdService";
import { CreateVideoService } from "../../services/VideoServices/CreateVideoService";
import { DeleteVideoService } from "../../services/VideoServices/DeleteVideoService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteVideoService: DeleteVideoService;
let createVideoService: CreateVideoService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let getVideoByIdService: GetVideoById;

describe("DeleteVideoService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();

    createVideoService = new CreateVideoService(
      videoRepository,
      turmaRepository
    );
    deleteVideoService = new DeleteVideoService(videoRepository);
    getVideoByIdService = new GetVideoById(videoRepository);
  });

  it("Um vídeo deve ser deletado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const videoCriado = await createVideoService.criar({
      turmaId: turma.id,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    await deleteVideoService.remover(videoCriado.id);

    await expect(
      getVideoByIdService.buscar(videoCriado.id)
    ).rejects.toMatchObject(new Error("Video não encontrado"));

    const error = await deleteVideoService
      .remover("123")
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

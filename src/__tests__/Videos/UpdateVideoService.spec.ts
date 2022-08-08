import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UpdateVideoService } from "../../services/VideoServices/UpdateVideoService";
import { CreateVideoService } from "../../services/VideoServices/CreateVideoService";
import { GetVideoById } from "../../services/VideoServices/GetVideoByIdService";

let updateVideoService: UpdateVideoService;
let createVideoService: CreateVideoService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let getVideoByIdService: GetVideoById;

describe("UpdateVideoService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();

    createVideoService = new CreateVideoService(
      videoRepository,
      turmaRepository
    );
    updateVideoService = new UpdateVideoService(videoRepository);
    getVideoByIdService = new GetVideoById(videoRepository);
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

    await updateVideoService.atualizar(video.id, {
      nome: "Nome Alterado",
      descricao: "Descrição Alterada",
      arquivoDoVideo: "./upload/",
      imagemBanner: "./upload/",
    });

    expect(await getVideoByIdService.buscar(video.id)).toMatchObject({
      nome: "Nome Alterado",
      descricao: "Descrição Alterada",
      arquivoDoVideo: "./upload/",
      imagemBanner: "./upload/",
    });
  });
});

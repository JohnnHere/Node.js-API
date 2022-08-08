import { CreateVideoService } from "../../services/VideoServices/CreateVideoService";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { GetVideoById } from "../../services/VideoServices/GetVideoByIdService";
import {
  ICreateVideoService,
  IGetVideoByIdService,
} from "../../@types/services/IVideoService";

let getVideoByIdService: IGetVideoByIdService;
let createVideoService: ICreateVideoService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;

describe("GetVideoByIdService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();

    getVideoByIdService = new GetVideoById(videoRepository);
    createVideoService = new CreateVideoService(
      videoRepository,
      turmaRepository
    );
  });

  it("Um vídeo deve ser buscado", async () => {
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

    const videoEncontrado = await getVideoByIdService.buscar(videoCriado.id);

    expect(videoEncontrado).toMatchObject({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });
    expect(videoEncontrado.turma.id).toBe(turma.id);
  });
});

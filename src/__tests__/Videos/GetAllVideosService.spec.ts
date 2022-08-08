import { GetAllVideosService } from "../../services/VideoServices/GetAllVideosService";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";

let getAllVideosService: GetAllVideosService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;

describe("GetAllVideosService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();

    getAllVideosService = new GetAllVideosService(videoRepository);
  });

  it("Deve retornar uma lista com os vídeos da turma", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video1 = await videoRepository.criar({
      turma,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const video2 = await videoRepository.criar({
      turma,
      nome: "Jest",
      descricao: "O video aborda a base de como criar testes",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const aux = await getAllVideosService.listar({ page: 1, per: 4 });

    expect(aux.data[0]).toMatchObject(video1);
    expect(aux.data[1]).toMatchObject(video2);
    expect(aux.data[3]).toBe(undefined);
  });
});

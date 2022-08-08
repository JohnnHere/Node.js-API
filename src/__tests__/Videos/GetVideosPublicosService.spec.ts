import { GetVideosPublicosService } from "../../services/VideoServices/GetVideosPublicosService";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";

let getVideosPublicosService: GetVideosPublicosService;
let videoRepository: VideoRepositoryInMemory;

describe("GetVideosPublicosService", () => {
  beforeEach(() => {
    videoRepository = new VideoRepositoryInMemory();

    getVideosPublicosService = new GetVideosPublicosService(videoRepository);
  });

  it("Deve retornar uma lista com os vídeos públicos", async () => {
    const video1 = await videoRepository.criar({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const video2 = await videoRepository.criar({
      nome: "Jest",
      descricao: "O video aborda a base de como criar testes",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const aux = await getVideosPublicosService.listarVideosPublicos({
      page: 1,
      per: 4,
    });

    expect(aux.data[0]).toMatchObject(video1);
    expect(aux.data[1]).toMatchObject(video2);
    expect(aux.data[3]).toBe(undefined);
  });
});

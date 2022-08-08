import { MateriaRepositoryInMemory } from "../../repositories/in-memory/MateriaRepositoryInMemory";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { GetAllMateriasService } from "../../services/MateriaServices/GetAllMateriasService";

let getAllMateriasService: GetAllMateriasService;
let materiaRepository: MateriaRepositoryInMemory;
let videoRepository: VideoRepositoryInMemory;

describe("GetAllMateriasService", () => {
  beforeEach(() => {
    materiaRepository = new MateriaRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();

    getAllMateriasService = new GetAllMateriasService(materiaRepository);
  });

  it("Deve retornar uma lista com todas as matérias", async () => {
    const video = await videoRepository.criar({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const materia1 = await materiaRepository.criar({
      video,
      nome: "Matéria de Git",
    });

    const materia2 = await materiaRepository.criar({
      video,
      nome: "Matéria de GitLab",
    });

    expect(await getAllMateriasService.listar()).toMatchObject([
      { id: materia1.id, nome: "Matéria de Git", video: video },
      { id: materia2.id, nome: "Matéria de GitLab", video: video },
    ]);
  });
});

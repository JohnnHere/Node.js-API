import { MateriaRepositoryInMemory } from "../../repositories/in-memory/MateriaRepositoryInMemory";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { CreateMateriaService } from "../../services/MateriaServices/CreateMateriaService";
import { ValidationService } from "../../services/utils/ValidationService";

let createMateriaService: CreateMateriaService;
let materiaRepository: MateriaRepositoryInMemory;
let videoRepository: VideoRepositoryInMemory;
let validationService: ValidationService;

describe("CreateMateriaService", () => {
  beforeEach(() => {
    materiaRepository = new MateriaRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();
    validationService = new ValidationService();

    createMateriaService = new CreateMateriaService(
      materiaRepository,
      videoRepository,
      validationService
    );
  });

  it("Deve ser criado uma nova materia", async () => {
    const video = await videoRepository.criar({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const materia = await createMateriaService.criar({
      videoId: video.id,
      nome: "Matéria de Git",
    });

    expect(materia).toMatchObject({
      video,
      nome: "Matéria de Git",
    });
  });

  it("Deve retornar erro de vídeo não encontrado", async () => {
    const materia = await createMateriaService
      .criar({
        videoId: "123",
        nome: "Matéria de Git",
      })
      .catch((error) => error);

    expect(materia).toBeInstanceOf(NotFoundError);
  });
});

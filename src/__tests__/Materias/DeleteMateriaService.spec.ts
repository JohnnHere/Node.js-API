import { MateriaRepositoryInMemory } from "../../repositories/in-memory/MateriaRepositoryInMemory";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { DeleteMateriaService } from "../../services/MateriaServices/DeleteMateriaService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteMateriaService: DeleteMateriaService;
let materiaRepository: MateriaRepositoryInMemory;
let videoRepository: VideoRepositoryInMemory;

describe("CreateMateriaService", () => {
  beforeEach(() => {
    materiaRepository = new MateriaRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();

    deleteMateriaService = new DeleteMateriaService(materiaRepository);
  });

  it("Uma matéria deve ser deletada", async () => {
    const video = await videoRepository.criar({
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const materia = await materiaRepository.criar({
      video,
      nome: "Matéria de Git",
    });

    await deleteMateriaService.remover(materia.id);

    expect(await materiaRepository.buscar(materia.id)).toBe(undefined);
  });

  it("Não deve encontrar uma metéria", async () => {
    const error = await deleteMateriaService
      .remover("123")
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

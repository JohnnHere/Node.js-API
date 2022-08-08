import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { CreateTurmaService } from "../../services/TurmaServices/CreateTurmaService";
import { GetTurmaService } from "../../services/TurmaServices/GetTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";

describe("GetTurmaService", () => {
  it("Deve dar get em uma turma pelo id", async () => {
    const turmaRepository = new TurmaRepositoryInMemory();
    const validationService = new ValidationService();

    const createTurma = new CreateTurmaService(
      turmaRepository,
      validationService
    );
    const getTurma = new GetTurmaService(turmaRepository);

    const turma = await createTurma.criar({
      nome: "Turma de Back-end",
      descricao: "Aulas com intuito de ensinar back-end",
      logoDoCurso: "Image.png",
    });

    const getTurmaById = await getTurma.buscar(turma.id);

    expect(getTurmaById).toMatchObject(turma);
  });
});

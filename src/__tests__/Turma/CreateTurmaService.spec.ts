import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { CreateTurmaService } from "../../services/TurmaServices/CreateTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";

let validationService: ValidationService;

describe("CreateTurma", () => {
  it("Deve criar uma nova turma", async () => {
    const fakeTurmaRepository = new TurmaRepositoryInMemory();
    validationService = new ValidationService();

    const createTurma = new CreateTurmaService(
      fakeTurmaRepository,
      validationService
    );

    const turma = await createTurma.criar({
      nome: "Turma de Back-end",
      descricao: "Aulas com intuito de ensinar back-end",
      logoDoCurso: "Image.png",
    });

    expect(turma).toHaveProperty("id");
  });
});

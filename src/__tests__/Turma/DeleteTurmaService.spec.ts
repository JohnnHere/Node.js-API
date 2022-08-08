import { NotFoundError } from "../../@types/errors/NotFoundError";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { CreateTurmaService } from "../../services/TurmaServices/CreateTurmaService";
import { DeleteTurmaService } from "../../services/TurmaServices/DeleteTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";

describe("DeleteTurmaService", () => {
  it("Deve apagar uma turma", async () => {
    const fakeTurmaRepository = new TurmaRepositoryInMemory();
    const validationService = new ValidationService();

    const createTurma = new CreateTurmaService(
      fakeTurmaRepository,
      validationService
    );
    const deleteTurma = new DeleteTurmaService(fakeTurmaRepository);

    const turma = await createTurma.criar({
      nome: "Turma de Back-end",
      descricao: "Aulas com intuito de ensinar back-end",
      logoDoCurso: "Image.png",
    });

    await deleteTurma.remover(turma.id);

    const error = await deleteTurma.remover("alo123").catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
    expect(turma).toBeUndefined;
  });
});

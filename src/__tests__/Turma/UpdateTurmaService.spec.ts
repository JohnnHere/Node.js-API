import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { CreateTurmaService } from "../../services/TurmaServices/CreateTurmaService";
import { UpdateTurmaService } from "../../services/TurmaServices/UpdateTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";

describe("UpdateTurmaService", () => {
  it("Deve atualizar a turma", async () => {
    const turmaRepository = new TurmaRepositoryInMemory();
    const validationService = new ValidationService();

    const createTurma = new CreateTurmaService(
      turmaRepository,
      validationService
    );
    const updateTurma = new UpdateTurmaService(turmaRepository);

    let turma = await createTurma.criar({
      nome: "Turma de Back-end",
      descricao: "Aulas com intuito de ensinar back-end",
      logoDoCurso: "Image.png",
    });

    turma = await updateTurma.atualizar(turma.id, {
      nome: "Atualizado",
      descricao: "Atualizado",
      logoDoCurso: "Atualizado",
    });
    expect(turma.nome).toContain("Atualizado");
    expect(turma.descricao).toContain("Atualizado");
    expect(turma.logoDoCurso).toContain("Atualizado");
  });
});

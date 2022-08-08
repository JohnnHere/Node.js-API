import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { ListTurmaService } from "../../services/TurmaServices/ListTurmaService";
import { CreateTurmaService } from "../../services/TurmaServices/CreateTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";

describe("ListTurmaService", () => {
  it("Listar todas as turmas", async () => {
    const fakeTurmaRepository = new TurmaRepositoryInMemory();
    const validationService = new ValidationService();

    const listTurma = new ListTurmaService(fakeTurmaRepository);
    const createTurma = new CreateTurmaService(
      fakeTurmaRepository,
      validationService
    );

    const turma1 = await createTurma.criar({
      nome: "Turma de Back-end",
      descricao: "Aulas com intuito de ensinar back-end",
      logoDoCurso: "Image.png",
    });

    const turma2 = await createTurma.criar({
      nome: "Front-end",
      descricao: "Aulas com intuito de ensinar front-end",
      logoDoCurso: "Image.png",
    });

    const turma3 = await createTurma.criar({
      nome: "Testes",
      descricao: "Aulas com intuito de ensinar testes",
      logoDoCurso: "Image.png",
    });

    const turmas = [turma1, turma2, turma3];

    const result = await listTurma.listar();
    expect(result).toEqual(turmas);
  });
});

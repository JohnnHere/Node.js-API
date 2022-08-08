import { ProfessorRepositoryInMemory } from "../../repositories/in-memory/ProfessorRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { ProfessorTurmaRepositoryInMemory } from "../../repositories/in-memory/ProfessorTurmaRepositoryInMemory";
import { DeleteProfessorTurmasService } from "../../services/ProfessorTurmaServices/DeleteProfessorTurmaService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteProfessorTurmasService: DeleteProfessorTurmasService;
let professorRepository: ProfessorRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let professorTurmaRepository: ProfessorTurmaRepositoryInMemory;

describe("CreateProfessorTurmaService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    professorRepository = new ProfessorRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    professorTurmaRepository = new ProfessorTurmaRepositoryInMemory();

    deleteProfessorTurmasService = new DeleteProfessorTurmasService(
      professorTurmaRepository
    );
  });

  it("Um objeto professorTurma deve ser deletado", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const professor = await professorRepository.cadastrar({ usuario });

    const turma = await turmaRepository.criar({
      nome: "Turma de NodeJS",
      descricao: "Programação Back-end com javascript",
      logoDoCurso: "Image.png",
    });

    await professorTurmaRepository.criar({
      professorId: professor.id,
      turmaId: turma.id,
    });

    await deleteProfessorTurmasService.remover({
      professorId: professor.id,
      turmaId: turma.id,
    });

    expect(
      await professorTurmaRepository.buscar({
        professorId: professor.id,
        turmaId: turma.id,
      })
    ).toBe(undefined);
  });

  it("Deve não encontrar o professor", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma de NodeJS",
      descricao: "Programação Back-end com javascript",
      logoDoCurso: "Image.png",
    });

    const error = await deleteProfessorTurmasService
      .remover({ professorId: "123", turmaId: turma.id })
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

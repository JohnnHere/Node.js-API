import { ProfessorRepositoryInMemory } from "../../repositories/in-memory/ProfessorRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { ProfessorTurmaRepositoryInMemory } from "../../repositories/in-memory/ProfessorTurmaRepositoryInMemory";
import { CreateProfessorTurmaService } from "../../services/ProfessorTurmaServices/CreateProfessorTurmaService";
import { ValidationService } from "../../services/utils/ValidationService";
import { ClassValidationError } from "../../@types/errors/ClassValidationError";

let createProfessorTurmaService: CreateProfessorTurmaService;
let professorRepository: ProfessorRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let professorTurmaRepository: ProfessorTurmaRepositoryInMemory;
let validationService: ValidationService;

describe("CreateProfessorTurmaService", () => {
  beforeEach(() => {
    usuarioRepository = new UsuarioRepositoryInMemory();
    professorRepository = new ProfessorRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    professorTurmaRepository = new ProfessorTurmaRepositoryInMemory();
    validationService = new ValidationService();

    createProfessorTurmaService = new CreateProfessorTurmaService(
      professorTurmaRepository,
      professorRepository,
      turmaRepository,
      validationService
    );
  });

  it("Deve ser criado um novo objeto professorTurma", async () => {
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

    const professorTurma = await createProfessorTurmaService.criar({
      professorId: professor.id,
      turmaId: turma.id,
    });

    expect(professorTurma).toMatchObject({
      professorId: professor.id,
      turmaId: turma.id,
    });
  });

  it("Deve retornar o erro de professor não encontrado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma de NodeJS",
      descricao: "Programação Back-end com javascript",
      logoDoCurso: "Image.png",
    });

    const professorTurma = await createProfessorTurmaService
      .criar({
        professorId: "123",
        turmaId: turma.id,
      })
      .catch((error) => error);

    expect(professorTurma).toBeInstanceOf(ClassValidationError);
  });

  it("Deve retornar o erro de turma não encontrada", async () => {
    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const professor = await professorRepository.cadastrar({ usuario });

    const professorTurma = await createProfessorTurmaService
      .criar({
        professorId: professor.id,
        turmaId: "123",
      })
      .catch((error) => error);

    expect(professorTurma).toBeInstanceOf(ClassValidationError);
  });
});

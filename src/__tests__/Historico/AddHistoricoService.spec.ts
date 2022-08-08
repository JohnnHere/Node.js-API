import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { HistoricoRepositoryInMemory } from "../../repositories/in-memory/HistoricoRepositoryInMemory";
import { AddHistoricoService } from "../../services/HistoricoServices/AddHistoricoService";
import { ValidationService } from "../../services/utils/ValidationService";
import { ClassValidationError } from "../../@types/errors/ClassValidationError";

let addHistoricoService: AddHistoricoService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let historicoRepository: HistoricoRepositoryInMemory;
let validationService: ValidationService;

describe("AddHistoricoService", () => {
  beforeEach(() => {
    turmaRepository = new TurmaRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();
    alunoRepository = new AlunoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();
    historicoRepository = new HistoricoRepositoryInMemory();
    validationService = new ValidationService();

    addHistoricoService = new AddHistoricoService(
      historicoRepository,
      videoRepository,
      alunoRepository,
      validationService
    );
  });

  it("Deve ser criado um novo iten do historico", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video = await videoRepository.criar({
      turma,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const aluno = await alunoRepository.cadastrar({ usuario, turma });

    await addHistoricoService.adicionar({
      videoId: video.id,
      alunoId: aluno.id,
    });

    const historico = await addHistoricoService.adicionar({
      videoId: video.id,
      alunoId: aluno.id,
    });

    expect(historico).toMatchObject({
      alunoId: aluno.id,
      videoId: video.id,
    });
  });

  it("Deve retornar o erro de video não encontrado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const usuario = await usuarioRepository.cadastrar({
      email: "email@email.com",
      nome: "Matheus",
      fotoPerfil: "./upload/42380523yhr",
      senha: "123456",
    });

    const aluno = await alunoRepository.cadastrar({ usuario, turma });

    const historico = await addHistoricoService
      .adicionar({
        videoId: "123",
        alunoId: aluno.id,
      })
      .catch((error) => error);

    expect(historico).toBeInstanceOf(ClassValidationError);
  });

  it("Deve retornar o erro de aluno não encontrado", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video = await videoRepository.criar({
      turma,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const historico = await addHistoricoService
      .adicionar({
        videoId: video.id,
        alunoId: "123",
      })
      .catch((error) => error);

    expect(historico).toBeInstanceOf(ClassValidationError);
  });
});

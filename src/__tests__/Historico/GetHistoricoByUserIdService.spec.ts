import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { HistoricoRepositoryInMemory } from "../../repositories/in-memory/HistoricoRepositoryInMemory";
import { AddHistoricoService } from "../../services/HistoricoServices/AddHistoricoService";
import { GetHistoricoByUserIdService } from "../../services/HistoricoServices/GetHistoricoByUserIdService";
import { ValidationService } from "../../services/utils/ValidationService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let addHistoricoService: AddHistoricoService;
let getHistoricoByUserIdService: GetHistoricoByUserIdService;
let videoRepository: VideoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let historicoRepository: HistoricoRepositoryInMemory;
let validationService: ValidationService;

describe("GetHistoricoByUserIdService", () => {
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

    getHistoricoByUserIdService = new GetHistoricoByUserIdService(
      historicoRepository,
      alunoRepository
    );
  });

  it("Deve ser buscado itens do historico", async () => {
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

    const historico1 = await addHistoricoService.adicionar({
      videoId: video.id,
      alunoId: aluno.id,
    });

    const historicos = await getHistoricoByUserIdService.listar({
      alunoId: aluno.id,
      page: 1,
      per: 3,
    });

    expect(historicos.data[0]).toMatchObject(historico1);
    expect(historicos.data[1]).toBe(undefined);
  });

  it("Deve retornar o erro de aluno não encontrado", async () => {
    const historicos = await getHistoricoByUserIdService
      .listar({
        alunoId: "123",
        page: 1,
        per: 3,
      })
      .catch((error) => error);

    expect(historicos).toBeInstanceOf(NotFoundError);
  });
});

import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { FavoritoRepositoryInMemory } from "../../repositories/in-memory/FavoritoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { CreateFavoritosService } from "../../services/FavoritoServices/CreateFavoritosService";
import { ValidationService } from "../../services/utils/ValidationService";
import { ClassValidationError } from "../../@types/errors/ClassValidationError";

let createFavoritoService: CreateFavoritosService;
let videoRepository: VideoRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let favoritoRepository: FavoritoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let validationService: ValidationService;

describe("CreateFavoritosService", () => {
  beforeEach(() => {
    favoritoRepository = new FavoritoRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();
    alunoRepository = new AlunoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();
    validationService = new ValidationService();

    createFavoritoService = new CreateFavoritosService(
      favoritoRepository,
      videoRepository,
      alunoRepository,
      validationService
    );
  });

  it("Deve ser criado um novo favorito", async () => {
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

    const aluno = await alunoRepository.cadastrar({
      turma,
      usuario,
    });

    const favorito = await createFavoritoService.criar({
      videoId: video.id,
      alunoId: aluno.id,
    });

    expect(favorito).toMatchObject({
      alunoId: aluno.id,
      videoId: video.id,
    });
  });

  it("Deve não encontrar um video", async () => {
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

    const aluno = await alunoRepository.cadastrar({
      turma,
      usuario,
    });

    const favorito = await createFavoritoService
      .criar({
        videoId: "321",
        alunoId: aluno.id,
      })
      .catch((error) => error);

    expect(favorito).toBeInstanceOf(ClassValidationError);
  });

  it("Deve não encontrar um aluno", async () => {
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

    const favorito = await createFavoritoService
      .criar({
        videoId: video.id,
        alunoId: "123",
      })
      .catch((error) => error);

    expect(favorito).toBeInstanceOf(ClassValidationError);
  });
});

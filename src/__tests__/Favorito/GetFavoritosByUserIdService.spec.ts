import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { FavoritoRepositoryInMemory } from "../../repositories/in-memory/FavoritoRepositoryInMemory";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { ValidationService } from "../../services/utils/ValidationService";
import { CreateFavoritosService } from "../../services/FavoritoServices/CreateFavoritosService";
import { GetFavoritosByUserIdService } from "../../services/FavoritoServices/GetFavoritosByUserIdService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let createFavoritoService: CreateFavoritosService;
let getFavoritosByUserIdService: GetFavoritosByUserIdService;
let videoRepository: VideoRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let favoritoRepository: FavoritoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let validationService: ValidationService;

describe("GetFavoritosByUserIdService", () => {
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

    getFavoritosByUserIdService = new GetFavoritosByUserIdService(
      favoritoRepository,
      alunoRepository
    );
  });

  it("Deve listar os favoritos do aluno", async () => {
    const turma = await turmaRepository.criar({
      nome: "Turma NodeJS",
      descricao: "Segunda turma de NodeJS",
      logoDoCurso: "./upload/42380523yhr2304238f2",
    });

    const video1 = await videoRepository.criar({
      turma,
      nome: "Git/Git Flow",
      descricao:
        "O video aborda os principais comandos git e a importância de usar o gitflow",
      arquivoDoVideo: "./upload/42380523yhr2304238f2",
      imagemBanner: "./upload/34jkrf2j3kfma04ds",
    });

    const video2 = await videoRepository.criar({
      turma,
      nome: "Jest",
      descricao: "Iniciando os testes",
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

    const favorito1 = await createFavoritoService.criar({
      videoId: video1.id,
      alunoId: aluno.id,
    });

    const favorito2 = await createFavoritoService.criar({
      videoId: video2.id,
      alunoId: aluno.id,
    });

    const favoritos = await getFavoritosByUserIdService.listar({
      alunoId: aluno.id,
      page: 1,
      per: 4,
    });

    expect(favoritos.data[0]).toMatchObject({
      alunoId: favorito1.alunoId,
      videoId: favorito1.videoId,
    });
    expect(favoritos.data[1]).toMatchObject({
      alunoId: favorito2.alunoId,
      videoId: favorito2.videoId,
    });
    expect(favoritos.data[3]).toBe(undefined);
  });

  it("Deve não encontrar um aluno", async () => {
    const favoritos = await getFavoritosByUserIdService
      .listar({
        alunoId: "123",
        page: 1,
        per: 4,
      })
      .catch((error) => error);

    expect(favoritos).toBeInstanceOf(NotFoundError);
  });
});

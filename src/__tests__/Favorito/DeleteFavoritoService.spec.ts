import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { AlunoRepositoryInMemory } from "../../repositories/in-memory/AlunoRepositoryInMemory";
import { FavoritoRepositoryInMemory } from "../../repositories/in-memory/FavoritoRepositoryInMemory";
import { DeleteFavoritosService } from "../../services/FavoritoServices/DeleteFavoritosService";
import { TurmaRepositoryInMemory } from "../../repositories/in-memory/TurmaRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteFavoritoService: DeleteFavoritosService;
let videoRepository: VideoRepositoryInMemory;
let alunoRepository: AlunoRepositoryInMemory;
let favoritoRepository: FavoritoRepositoryInMemory;
let turmaRepository: TurmaRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;

describe("DeleteFavoritosService", () => {
  beforeEach(() => {
    favoritoRepository = new FavoritoRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();
    alunoRepository = new AlunoRepositoryInMemory();
    turmaRepository = new TurmaRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();

    deleteFavoritoService = new DeleteFavoritosService(favoritoRepository);
  });

  it("Um favorito deve ser deletado", async () => {
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

    await favoritoRepository.criar({
      videoId: video.id,
      alunoId: aluno.id,
    });

    expect(
      await deleteFavoritoService.remover({
        videoId: video.id,
        alunoId: aluno.id,
      })
    ).toBe(undefined);

    const error = await deleteFavoritoService
      .remover({ videoId: "123", alunoId: "123" })
      .catch((error) => error);
    expect(error).toBeInstanceOf(NotFoundError);
  });
});

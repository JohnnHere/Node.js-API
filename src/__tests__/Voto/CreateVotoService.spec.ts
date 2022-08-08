import { VotoRepositoryInMemory } from "../../repositories/in-memory/VotoRepositoryInMemory";
import { ComentarioRepositoryInMemory } from "../../repositories/in-memory/ComentarioRepositoryInMemory";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { CreateVotoService } from "../../services/VotoServices/CreateVotoService";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { ForbiddenError } from "../../@types/errors/ForbiddenError";

let createVotoService: CreateVotoService;
let votoRepository: VotoRepositoryInMemory;
let comentarioRepository: ComentarioRepositoryInMemory;
let videoRepository: VideoRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;

describe("CreateVotoService", () => {
  beforeEach(() => {
    votoRepository = new VotoRepositoryInMemory();
    comentarioRepository = new ComentarioRepositoryInMemory();
    videoRepository = new VideoRepositoryInMemory();
    usuarioRepository = new UsuarioRepositoryInMemory();

    createVotoService = new CreateVotoService(
      votoRepository,
      comentarioRepository
    );
  });

  it("Deve ser criado um novo voto", async () => {
    const video = await videoRepository.criar({
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

    const comentario = await comentarioRepository.criar({
      video,
      usuario,
      conteudo: "Adorei o vídeo",
    });

    const novoVoto = await createVotoService.criar({
      comentarioId: comentario.id,
      usuarioId: usuario.id,
      voto: true,
    });

    expect(novoVoto).toMatchObject({
      usuarioId: usuario.id,
      comentarioId: comentario.id,
      voto: true,
    });
  });

  it("Não deve dar para votar 2 vezes no mesmo comentario", async () => {
    const video = await videoRepository.criar({
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

    const comentario = await comentarioRepository.criar({
      video,
      usuario,
      conteudo: "Adorei o vídeo",
    });
    await createVotoService.criar({
      comentarioId: comentario.id,
      usuarioId: usuario.id,
      voto: false,
    });
    const voto2 = await createVotoService
      .criar({
        comentarioId: comentario.id,
        usuarioId: usuario.id,
        voto: false,
      })
      .catch((error) => error);
    expect(voto2).toBeInstanceOf(ForbiddenError);
  });

  it("Não deve encontrar o comentario", async () => {
    const voto = await createVotoService
      .criar({
        comentarioId: "123",
        usuarioId: "123",
        voto: false,
      })
      .catch((error) => error);
    expect(voto).toBeInstanceOf(NotFoundError);
  });
});

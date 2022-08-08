import { VotoRepositoryInMemory } from "../../repositories/in-memory/VotoRepositoryInMemory";
import { ComentarioRepositoryInMemory } from "../../repositories/in-memory/ComentarioRepositoryInMemory";
import { VideoRepositoryInMemory } from "../../repositories/in-memory/VideoRepositoryInMemory";
import { UsuarioRepositoryInMemory } from "../../repositories/in-memory/UsuarioRepositoryInMemory";
import { DeleteVotoService } from "../../services/VotoServices/DeleteVotoService";
import { CreateVotoService } from "../../services/VotoServices/CreateVotoService";
import { NotFoundError } from "../../@types/errors/NotFoundError";

let deleteVotoService: DeleteVotoService;
let votoRepository: VotoRepositoryInMemory;
let comentarioRepository: ComentarioRepositoryInMemory;
let videoRepository: VideoRepositoryInMemory;
let usuarioRepository: UsuarioRepositoryInMemory;
let createVotoService: CreateVotoService;

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

    deleteVotoService = new DeleteVotoService(votoRepository);
  });

  it("Deve deletar um voto", async () => {
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

    await deleteVotoService.remover(novoVoto);

    expect(await votoRepository.buscar(novoVoto)).toBe(undefined);

    const error = await deleteVotoService
      .remover({
        comentarioId: "123",
        usuarioId: "123",
      })
      .catch((error) => error);

    expect(error).toBeInstanceOf(NotFoundError);
  });
});

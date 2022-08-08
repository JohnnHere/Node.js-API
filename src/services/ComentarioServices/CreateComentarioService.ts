import { ICreateComentarioService } from "../../@types/services/IComentarioService";
import { Inject, Service } from "typedi";
import { IComentarioRepository } from "../../@types/repositories/IComentarioRepository";
import { ComentarioDTO } from "../../@types/dto/ComentarioDTO";
import { Comentario } from "../../models/comentario";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("CreateComentarioService")
export class CreateComentarioService implements ICreateComentarioService {
  constructor(
    @Inject("ComentarioRepository")
    private comentarioRepository: IComentarioRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async criar({
    videoId,
    usuarioId,
    conteudo,
  }: ComentarioDTO): Promise<Comentario> {
    const video = await this.videoRepository.buscar(videoId);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }

    const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

    if (!usuario) {
      throw new NotFoundError("Usuario não encontrado");
    }

    const comentario = new Comentario();
    Object.assign(comentario, { video, usuario, conteudo });

    await this.validationService.validate(comentario);

    const novoComentario = await this.comentarioRepository.criar({
      video,
      usuario,
      conteudo,
    });

    return novoComentario;
  }
}

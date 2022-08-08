import { IFavoritoRepository } from "../../@types/repositories/IFavoritoRepository";
import { Favorito } from "../../models/favorito";
import { Inject, Service } from "typedi";
import { ICreateFavoritosService } from "../../@types/services/IFavoritoService";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { CreateFavoritoDTO } from "../../@types/dto/FavoritoDTO";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("CreateFavoritosService")
export class CreateFavoritosService implements ICreateFavoritosService {
  constructor(
    @Inject("FavoritoRepository")
    private favoritosRepository: IFavoritoRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("AlunoRepository") private alunoRepository: IAlunoRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async criar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito> {
    const favorito = new Favorito();
    Object.assign(favorito, { videoId, alunoId });

    await this.validationService.validate(favorito);

    const video = await this.videoRepository.buscar(videoId);
    const aluno = await this.alunoRepository.buscarPorAlunoId(alunoId);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }
    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    const novoFavorito = await this.favoritosRepository.criar({
      videoId,
      alunoId,
    });

    return novoFavorito;
  }
}

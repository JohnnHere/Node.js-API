import { IFavoritoRepository } from "../../@types/repositories/IFavoritoRepository";
import { Inject, Service } from "typedi";
import { CreateFavoritoDTO } from "../../@types/dto/FavoritoDTO";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IDeleteFavoritosService } from "../../@types/services/IFavoritoService";

@Service("DeleteFavoritosService")
export class DeleteFavoritosService implements IDeleteFavoritosService {
  constructor(
    @Inject("FavoritoRepository")
    private favoritoRespository: IFavoritoRepository
  ) {}

  async remover({ videoId, alunoId }: CreateFavoritoDTO): Promise<void> {
    const favorito = await this.favoritoRespository.buscar({
      videoId,
      alunoId,
    });

    if (!favorito) {
      throw new NotFoundError("O vídeo não está favoritado.");
    }

    await this.favoritoRespository.remover(favorito);
  }
}

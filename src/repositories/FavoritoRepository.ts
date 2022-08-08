import { IFavoritoRepository } from "../@types/repositories/IFavoritoRepository";
import { EntityRepository, Repository } from "typeorm";
import { Favorito } from "../models/favorito";
import {
  CreateFavoritoDTO,
  QueryFavoritosPorAluno,
} from "../@types/dto/FavoritoDTO";

@EntityRepository(Favorito)
export class FavoritoRepository
  extends Repository<Favorito>
  implements IFavoritoRepository
{
  async criar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito> {
    const favorito = await this.save({
      videoId,
      alunoId,
    });
    return favorito;
  }

  async remover(favorito: Favorito): Promise<void> {
    await this.remove(favorito);
  }

  async listar(query: QueryFavoritosPorAluno): Promise<[Favorito[], number]> {
    const { alunoId, orderBy, orderDirection, page, per } = query;

    const [favoritos, total] = await this.findAndCount({
      where: { alunoId },
      order: {
        [orderBy]: orderDirection,
      },
      skip: (page - 1) * per,
      take: per,
    });

    return [favoritos, total];
  }

  async buscar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito> {
    const favorito = await this.findOne({ where: { videoId, alunoId } });
    return favorito;
  }
}

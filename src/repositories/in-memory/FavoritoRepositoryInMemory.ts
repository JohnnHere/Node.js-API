import { IFavoritoRepository } from "../../@types/repositories/IFavoritoRepository";
import { Favorito } from "../../models/favorito";
import { Repository } from "typeorm";
import {
  CreateFavoritoDTO,
  QueryFavoritosPorAluno,
} from "../../@types/dto/FavoritoDTO";

export class FavoritoRepositoryInMemory
  extends Repository<Favorito>
  implements IFavoritoRepository
{
  favoritos: Favorito[];

  constructor() {
    super();
    this.favoritos = [];
  }

  async criar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito> {
    const favorito = new Favorito();

    Object.assign(favorito, {
      videoId,
      alunoId,
    });

    this.favoritos.push(favorito);

    return favorito;
  }

  async buscar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito> {
    return this.favoritos.find(
      (f) => f.videoId === videoId && f.alunoId === alunoId
    );
  }

  async remover(favorito: Favorito): Promise<void> {
    const aux = this.favoritos.filter(
      (f) => f.videoId !== favorito.videoId && f.alunoId !== favorito.alunoId
    );
    this.favoritos = aux;
  }

  async listar(query: QueryFavoritosPorAluno): Promise<[Favorito[], number]> {
    const aux: Favorito[] = [];
    for (let i = 0; i < query.per; i++) {
      aux.push(this.favoritos[i]);
    }

    return [this.favoritos, query.per];
  }
}

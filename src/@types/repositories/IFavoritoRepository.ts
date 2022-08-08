import { CreateFavoritoDTO, QueryFavoritosPorAluno } from "../dto/FavoritoDTO";
import { Repository } from "typeorm";
import { Favorito } from "../../models/favorito";

export interface IFavoritoRepository extends Repository<Favorito> {
  criar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito>;
  listar(query: QueryFavoritosPorAluno): Promise<[Favorito[], number]>;
  buscar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito>;
  remover(favorito: Favorito): Promise<void>;
}

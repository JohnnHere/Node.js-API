import { Favorito } from "../../models/favorito";
import {
  CreateFavoritoDTO,
  QueryFavoritosPorAluno,
  RetornoListaFavoritos,
} from "../dto/FavoritoDTO";

export interface IGetFavoritosByUserIdService {
  listar(
    queryFavoritosPorAluno: QueryFavoritosPorAluno
  ): Promise<RetornoListaFavoritos>;
}

export interface ICreateFavoritosService {
  criar({ videoId, alunoId }: CreateFavoritoDTO): Promise<Favorito>;
}

export interface IDeleteFavoritosService {
  remover({ videoId, alunoId }: CreateFavoritoDTO): Promise<void>;
}

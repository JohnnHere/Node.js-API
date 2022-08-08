import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IGetFavoritosByUserIdService } from "../../@types/services/IFavoritoService";
import { QueryFavoritosPorAluno } from "../../@types/dto/FavoritoDTO";

@Service("GetFavoritosByUserIdController")
export class GetFavoritosByUserIdController {
  constructor(
    @Inject("GetAllFavoritosByUserIdService")
    private getFavoritosByUserIdService: IGetFavoritosByUserIdService
  ) {}

  async listar(req: Request, res: Response) {
    const query = this.constroiQueryFavorito(req);

    const favoritos = await this.getFavoritosByUserIdService.listar(query);

    res.send(favoritos);
  }

  private constroiQueryFavorito(req: Request): QueryFavoritosPorAluno {
    return {
      alunoId: req.params.alunoId,
      page: Number(req.query.page?.toString() ?? 0),
      per: Number(req.query.per?.toString() ?? 0),
      orderBy: req.query.orderBy?.toString(),
      orderDirection: req.query.orderDirection?.toString(),
    };
  }
}

import { IGetAllMateriasService } from "../../@types/services/IMateriaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("GetAllMateriasController")
export class GetAllMateriasController {
  constructor(
    @Inject("GetAllMateriasService")
    private getAllMateriasService: IGetAllMateriasService
  ) {}

  async listar(req: Request, res: Response) {
    const videos = await this.getAllMateriasService.listar();

    res.send(videos);
  }
}

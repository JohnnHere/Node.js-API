import { ICreateMateriaService } from "../../@types/services/IMateriaService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CreateMateriaController")
export class CreateMateriaController {
  constructor(
    @Inject("CreateMateriaService")
    private createMateriaService: ICreateMateriaService
  ) {}

  async criar(req: Request, res: Response) {
    const { videoId, nome } = req.body;

    const materia = await this.createMateriaService.criar({ videoId, nome });

    return res.status(201).send(materia);
  }
}

import { ICreateVotoService } from "../../@types/services/IVotoService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CreateVotoController")
export class CreateVotoController {
  constructor(
    @Inject("CreateVotoService") private createVotoService: ICreateVotoService
  ) {}

  async criar(req: Request, res: Response) {
    const { comentarioId, usuarioId, voto } = req.body;

    const novoVoto = await this.createVotoService.criar({
      comentarioId,
      usuarioId,
      voto,
    });

    res.status(201).send(novoVoto);
  }
}

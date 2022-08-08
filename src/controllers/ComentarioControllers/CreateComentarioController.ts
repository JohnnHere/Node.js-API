import { ICreateComentarioService } from "../../@types/services/IComentarioService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service("CreateComentarioController")
export class CreateComentarioController {
  constructor(
    @Inject("CreateComentarioService")
    private createComentarioService: ICreateComentarioService
  ) {}

  async criar(req: Request, res: Response) {
    const { videoId, usuarioId, conteudo } = req.body;
    const comentario = await this.createComentarioService.criar({
      videoId,
      usuarioId,
      conteudo,
    });

    res.status(201).send(comentario);
  }
}

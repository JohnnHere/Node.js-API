import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { BadRequestError } from "../../@types/errors/BadRequestError";

export class UploadVideoController {
  async upload(req: Request, res: Response) {
    const { file } = req;

    const arquivo = instanceToInstance({
      tipo: file.mimetype,
      caminho: file.path,
      tamanho: file.size,
    });

    if (arquivo.tipo === "video/mp4") {
      res.status(201).send(arquivo.caminho);
    } else {
      throw new BadRequestError("A rota só aceita vídeos do tipo mp4");
    }
  }
}

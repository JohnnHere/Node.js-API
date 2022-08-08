import { Request, Response } from "express";

export class DownloadController {
  async download(req: Request, res: Response) {
    const { caminho } = req.body;

    res.setHeader("Content-disposition", `attachment; filename=${caminho}`);
    res.setHeader("Content-Type", "image/jpeg; image/png; video/mp4");
    res.download(caminho);
  }
}

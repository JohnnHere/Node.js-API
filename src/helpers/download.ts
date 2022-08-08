import { Request, Response } from "express";

export function download(req: Request, res: Response) {
  const { caminho } = req.body;

  res.setHeader("Content-disposition", `attachment; filename=${caminho}`);

  res.download(caminho);
}

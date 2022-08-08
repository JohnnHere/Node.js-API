import { instanceToInstance } from "class-transformer";

export function upload(file: Express.Multer.File) {
  const arquivo = instanceToInstance({
    tipo: file.mimetype,
    caminho: file.path,
    tamanho: file.size,
  });

  return arquivo;
}

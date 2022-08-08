import { ComentarioDTO } from "../../@types/dto/ComentarioDTO";
import { Comentario } from "../../models/comentario";

export interface ICreateComentarioService {
  criar({ videoId, usuarioId, conteudo }: ComentarioDTO): Promise<Comentario>;
}

export interface IDeleteComentarioService {
  remover(id: string): Promise<void>;
}

export interface IGetComentarioByIdService {
  buscar(id: string): Promise<Comentario>;
}

export interface IGetComentariosByVideoIdService {
  listar(id: string): Promise<Comentario[]>;
}

export interface IUpdateComentarioService {
  atualizar(
    id: string,
    { videoId, usuarioId, conteudo }: Partial<ComentarioDTO>
  ): Promise<Comentario>;
}

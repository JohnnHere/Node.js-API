import { Usuario } from "../../models/usuario";
import { Video } from "../../models/video";

export interface CreateComentarioDTO {
  video: Video;
  usuario: Usuario;
  conteudo: string;
}

export interface ComentarioDTO {
  videoId: string;
  usuarioId: string;
  conteudo: string;
}

export interface getAllComentariosDTO {
  id: string;
  videoId: string;
  usuarioId: string;
  numeroLikes: number;
  numeroDislikes: number;
  conteudo: string;
}

import { UsuarioVotaComentario } from "../../models/usuario_vota_comentario";
import { CreateVotoDTO, DeleteVotoDTO } from "../../@types/dto/VotoDTO";

export interface ICreateVotoService {
  criar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario>;
}

export interface IDeleteVotoService {
  remover({ comentarioId, usuarioId }: DeleteVotoDTO): Promise<void>;
}

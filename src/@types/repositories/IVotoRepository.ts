import { CreateVotoDTO } from "../../@types/dto/VotoDTO";
import { UsuarioVotaComentario } from "../../models/usuario_vota_comentario";
import { Repository } from "typeorm";

export interface IVotoRepository extends Repository<UsuarioVotaComentario> {
  criar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario>;
  buscar({
    comentarioId,
    usuarioId,
    voto,
  }: CreateVotoDTO): Promise<UsuarioVotaComentario>;
  buscaPorId({ comentarioId, usuarioId }): Promise<UsuarioVotaComentario>;
  remover(voto: UsuarioVotaComentario): Promise<void>;
}

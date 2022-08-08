import { CreateAdminDTO } from "../../@types/dto/AdminDTO";
import { Repository } from "typeorm";
import { Admin } from "../../models/admin";

export interface IAdminRepository extends Repository<Admin> {
  criar({ usuario }: CreateAdminDTO): Promise<Admin>;
  buscar(usuarioId: string): Promise<Admin>;
  buscarPorUsuarioId(usuarioId: string): Promise<Admin>;
  remover(admin: Admin): Promise<void>;
}

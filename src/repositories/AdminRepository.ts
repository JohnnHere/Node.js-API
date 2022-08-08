import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../models/admin";
import { IAdminRepository } from "../@types/repositories/IAdminRepository";
import { CreateAdminDTO } from "../@types/dto/AdminDTO";

@EntityRepository(Admin)
export class AdminRepository
  extends Repository<Admin>
  implements IAdminRepository {
  async criar({ usuario }: CreateAdminDTO): Promise<Admin> {
    const admin = await this.save({ usuario });
    return admin;
  }

  async buscar(id: string): Promise<Admin> {
    const admin = await this.findOne({ where: id });
    return admin;
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Admin> {
    const admin = await this.findOne({ where: { usuario: usuarioId } });
    return admin;
  }

  async remover(admin: Admin): Promise<void> {
    await this.remove(admin);
  }
}

import { IAdminRepository } from "../../@types/repositories/IAdminRepository";
import { Admin } from "../../models/admin";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { CreateAdminDTO } from "../../@types/dto/AdminDTO";

export class AdminRepositoryInMemory
  extends Repository<Admin>
  implements IAdminRepository
{
  admins: Admin[];

  constructor() {
    super();
    this.admins = [];
  }

  async criar({ usuario }: CreateAdminDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, {
      id: randomUUID(),
      email: usuario.email,
      nome: usuario.nome,
      fotoPerfil: usuario.fotoPerfil,
      senha: usuario.senha,
      usuario,
    });

    this.admins.push(admin);

    return admin;
  }

  async buscar(id: string): Promise<Admin> {
    return this.admins.find((admin) => admin.usuario.id === id);
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Admin> {
    return this.admins.find((admin) => admin.usuario.id === usuarioId);
  }

  async remover(admin: Admin): Promise<void> {
    const aux = this.admins.filter((a) => a !== admin);
    this.admins = aux;
  }
}

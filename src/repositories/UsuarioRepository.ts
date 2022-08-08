import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/usuario";
import { EntityRepository, Repository } from "typeorm";
import { UpdateUsuarioDTO, UsuarioDTO } from "../@types/dto/UsuarioDTO";

@EntityRepository(Usuario)
export class UsuarioRepository
  extends Repository<Usuario>
  implements IUsuarioRepository
{
  async cadastrar({
    email,
    nome,
    fotoPerfil,
    senha,
  }: UsuarioDTO): Promise<Usuario> {
    return this.save({
      email,
      nome,
      fotoPerfil,
      senha,
    });
  }

  async buscar(email: string): Promise<Usuario> {
    return await this.findOne({
      where: { email },
      relations: ["professor", "admin", "aluno"],
    });
  }

  async buscarPorId(id: string): Promise<Usuario> {
    return await this.findOne({ where: { id } });
  }

  async atualizaSenha(usuario: Usuario, senha: string): Promise<Usuario> {
    usuario.senha = senha;
    return this.save(usuario);
  }

  async atualizar(
    id: string,
    { email, nome, fotoPerfil }: Partial<UpdateUsuarioDTO>
  ): Promise<Usuario> {
    const usuario = await this.findOne(email);
    usuario.email = email ?? usuario.email;
    usuario.nome = nome ?? usuario.nome;
    usuario.fotoPerfil = fotoPerfil ?? usuario.fotoPerfil;
    return this.save(usuario);
  }

  async remover(usuario: Usuario): Promise<void> {
    await this.remove(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return await this.find();
  }
}

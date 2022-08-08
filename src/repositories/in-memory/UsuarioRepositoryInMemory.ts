import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { IUsuarioRepository } from "../../@types/repositories/IUsuarioRepository";
import { Usuario } from "../../models/usuario";
import { UpdateUsuarioDTO, UsuarioDTO } from "../../@types/dto/UsuarioDTO";

export class UsuarioRepositoryInMemory
  extends Repository<Usuario>
  implements IUsuarioRepository
{
  usuarios: Usuario[];

  constructor() {
    super();
    this.usuarios = [];
  }

  async cadastrar({
    email,
    nome,
    fotoPerfil,
    senha,
  }: UsuarioDTO): Promise<Usuario> {
    const usuario = new Usuario();

    Object.assign(usuario, {
      id: randomUUID(),
      email,
      nome,
      fotoPerfil,
      senha,
    });

    this.usuarios.push(usuario);

    return usuario;
  }

  async buscar(email: string): Promise<Usuario> {
    return this.usuarios.find((usuario) => usuario.email === email);
  }

  async buscarPorId(id: string): Promise<Usuario> {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  async atualizar(
    id,
    { email, nome, fotoPerfil }: Partial<UpdateUsuarioDTO>
  ): Promise<Usuario> {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);

    const usuarioVotaComentarios = [];
    const comentarios = [];
    const professor = null;
    const aluno = null;
    const admin = null;
    const createdAt = new Date();
    const updatedAt = new Date();

    this.usuarios[index] = {
      id,
      email,
      nome,
      fotoPerfil,
      senha: this.usuarios[index].senha,
      usuarioVotaComentarios,
      comentarios,
      professor,
      aluno,
      admin,
      createdAt,
      updatedAt,
    };

    return this.usuarios[index];
  }

  async atualizaSenha(usuario: Usuario, senha: string): Promise<Usuario> {
    usuario.senha = senha;

    const index = this.usuarios.findIndex((u) => u.id === usuario.id);

    this.usuarios[index] = usuario;

    return usuario;
  }

  async remover(usuario: Usuario): Promise<void> {
    const aux = this.usuarios.filter((u) => u !== usuario);
    this.usuarios = aux;
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarios;
  }
}

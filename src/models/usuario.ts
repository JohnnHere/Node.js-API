import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Admin } from "./admin";
import { Aluno } from "./aluno";
import { Comentario } from "./comentario";
import { Professor } from "./professor";
import { UsuarioVotaComentario } from "./usuario_vota_comentario";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @MinLength(3, { message: "O nome deve ter no mínimo 3 caracteres" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @Column()
  nome: string;

  @IsEmail({}, { message: "O email deve ser um email válido" })
  @IsString({ message: "O email deve ser uma string" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  @Column()
  email: string;

  @IsString({ message: "O caminho da foto deve ser uma string" })
  @IsNotEmpty({ message: "O caminho da foto não pode ser vazio" })
  @Column({ name: "foto_perfil" })
  fotoPerfil: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  senha: string;

  @OneToMany(
    () => UsuarioVotaComentario,
    (usuarioVotaComentario) => usuarioVotaComentario.usuario
  )
  usuarioVotaComentarios: UsuarioVotaComentario[];

  @OneToMany(() => Comentario, (comentario) => comentario.usuario, { onDelete: 'CASCADE' })
  comentarios: Comentario[];

  @OneToOne(() => Professor, (professor) => professor.usuario, { onDelete: 'CASCADE' })
  professor: Professor;

  @OneToOne(() => Aluno, (aluno) => aluno.usuario, { onDelete: 'CASCADE' })
  aluno: Aluno;

  @OneToOne(() => Admin, (admin) => admin.usuario, { onDelete: 'CASCADE' })
  admin: Admin;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

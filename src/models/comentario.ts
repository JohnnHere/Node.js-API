import { IsString, MaxLength } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./usuario";
import { UsuarioVotaComentario } from "./usuario_vota_comentario";
import { Video } from "./video";

@Entity("comentarios")
export class Comentario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "numero_likes" })
  numeroLikes: number;

  @Column({ name: "numero_dislikes" })
  numeroDislikes: number;

  @MaxLength(255, { message: "O conteúdo deve ter no máximo 255 caracteres" })
  @IsString({ message: "O conteúdo deve ser uma string" })
  @Column()
  conteudo: string;

  @OneToMany(
    () => UsuarioVotaComentario,
    (usuarioVotaComentario) => usuarioVotaComentario.comentario
  )
  usuarioVotaComentarios: UsuarioVotaComentario[];

  @ManyToOne(() => Video, (video) => video.comentarios)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentarios)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

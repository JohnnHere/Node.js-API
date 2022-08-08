import { IsBoolean, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comentario } from "./comentario";
import { Usuario } from "./usuario";

@Entity("usuario_vota_comentarios")
export class UsuarioVotaComentario {
  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "usuario_id" })
  usuarioId: string;

  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "comentario_id" })
  comentarioId: string;

  @IsBoolean({ message: "O voto deve ser um booleano" })
  @Column()
  voto: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioVotaComentarios)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @ManyToOne(
    () => Comentario,
    (comentario) => comentario.usuarioVotaComentarios
  )
  @JoinColumn({ name: "comentario_id" })
  comentario: Comentario;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

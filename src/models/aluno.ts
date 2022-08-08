import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Usuario } from "./usuario";
import { Turma } from "./turma";
import { Favorito } from "./favorito";
import { Historico } from "./historico";
import { IsUUID } from "class-validator";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.aluno)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @IsUUID("4", { message: "O turma_id deve ser uma UUID válida." })
  @ManyToOne(() => Turma, (turma) => turma.alunos)
  @JoinColumn({ name: "turma_id" })
  turma: Turma;

  @OneToMany(() => Favorito, (favorito) => favorito.aluno)
  favoritos: Favorito[];

  @OneToMany(() => Historico, (historico) => historico.aluno)
  historicos: Historico[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

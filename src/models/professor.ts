import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProfessorTurma } from "./professor_turma";
import { Usuario } from "./usuario";

@Entity("professores")
export class Professor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => ProfessorTurma, (professorTurma) => professorTurma.professor)
  professorTurmas: ProfessorTurma[];

  @OneToOne(() => Usuario, (usuario) => usuario.professor)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

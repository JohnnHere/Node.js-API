import { IsUUID } from "class-validator";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Professor } from "./professor";
import { Turma } from "./turma";

@Entity("professores_turmas")
export class ProfessorTurma {
  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn("uuid", { name: "professor_id" })
  professorId: string;

  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn("uuid", { name: "turma_id" })
  turmaId: string;

  @ManyToOne(() => Professor, (professor) => professor.professorTurmas)
  @JoinColumn({ name: "professor_id" })
  professor: Professor;

  @ManyToOne(() => Turma, (turma) => turma.professorTurmas)
  @JoinColumn({ name: "turma_id" })
  turma: Turma;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

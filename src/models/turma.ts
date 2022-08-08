import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Aluno } from "./aluno";
import { ProfessorTurma } from "./professor_turma";
import { Video } from "./video";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("turmas")
export class Turma {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @Column()
  nome: string;

  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição não pode ser vazio" })
  @Column()
  descricao: string;

  @IsString({ message: "O caminho da logo do curso deve ser uma string" })
  @IsNotEmpty({ message: "O caminho da logo do curso não pode ser vazio" })
  @Column({ name: "logo_do_curso" })
  logoDoCurso: string;

  @OneToMany(() => Aluno, (aluno) => aluno.turma)
  alunos: Aluno[];

  @OneToMany(() => ProfessorTurma, (professorTurma) => professorTurma.turma)
  professorTurmas: ProfessorTurma[];

  @OneToMany(() => Video, (video) => video.turma)
  videos: Video[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}

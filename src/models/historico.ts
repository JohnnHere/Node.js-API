import { IsUUID } from "class-validator";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Aluno } from "./aluno";
import { Video } from "./video";

@Entity("historico")
export class Historico {
  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "aluno_id" })
  alunoId: string;

  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "video_id" })
  videoId: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.historicos)
  @JoinColumn({ name: "aluno_id" })
  aluno: Aluno;

  @ManyToOne(() => Video, (video) => video.historicos)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

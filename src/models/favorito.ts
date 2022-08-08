import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Video } from "./video";
import { Aluno } from "./aluno";
import { IsUUID } from "class-validator";

@Entity("favoritos")
export class Favorito {
  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "video_id" })
  videoId: string;

  @IsUUID("4", { message: "O id deve ser uma UUID válida." })
  @PrimaryColumn({ name: "aluno_id" })
  alunoId: string;

  @ManyToOne(() => Video, (video) => video.favoritos)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @ManyToOne(() => Aluno, (aluno) => aluno.favoritos)
  @JoinColumn({ name: "aluno_id" })
  aluno: Aluno;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

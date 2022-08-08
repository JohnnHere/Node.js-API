import { IsNotEmpty, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Video } from "./video";

@Entity("materias")
export class Materia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @Column()
  nome: string;

  @ManyToOne(() => Video, (video) => video.materias)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

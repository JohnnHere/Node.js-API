import { IsNotEmpty, IsString } from "class-validator";
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
import { Comentario } from "./comentario";
import { Favorito } from "./favorito";
import { Historico } from "./historico";
import { Materia } from "./materia";
import { Turma } from "./turma";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @Column()
  nome: string;

  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição não pode ser vazia" })
  @Column()
  descricao: string;

  @IsString({ message: "O caminho da vídeo deve ser uma string" })
  @IsNotEmpty({ message: "O caminho da vídeo não pode ser vazio" })
  @Column({ name: "arquivo_do_video" })
  arquivoDoVideo: string;

  @IsString({ message: "O caminho da imagem deve ser uma string" })
  @IsNotEmpty({ message: "O caminho da imagem não pode ser vazio" })
  @Column({ name: "imagem_banner" })
  imagemBanner: string;

  @OneToMany(() => Comentario, (comentario) => comentario.video)
  comentarios: Comentario[];

  @OneToMany(() => Favorito, (favorito) => favorito.video)
  favoritos: Favorito[];

  @OneToMany(() => Historico, (historico) => historico.video)
  historicos: Historico[];

  @ManyToOne(() => Turma, (turma) => turma.videos)
  @JoinColumn({ name: "turma_id" })
  turma: Turma;

  @OneToMany(() => Materia, (materia) => materia.video)
  materias: Materia[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

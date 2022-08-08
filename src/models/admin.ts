import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./usuario";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.admin)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

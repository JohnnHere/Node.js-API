import { Materia } from "../models/materia";
import { EntityRepository, Repository } from "typeorm";
import { IMateriaRepository } from "../@types/repositories/IMateriaRepository";
import { CreateMateriaDTO } from "../@types/dto/MateriaDTO";

@EntityRepository(Materia)
export class MateriaRepository
  extends Repository<Materia>
  implements IMateriaRepository {
  async criar({ video, nome }: CreateMateriaDTO): Promise<Materia> {
    const materia = await this.save({ video, nome });
    return materia;
  }

  async listarRecomendados(videoId: string): Promise<Materia[]> {
    const materias = await this.find({
      select: ["nome"],
      where: { video: videoId },
    });
    const materiasDoVideo = materias.map((materia) => materia.nome);
    const videosComMesmaMateria = await this.createQueryBuilder("materia")
      .leftJoinAndSelect("materia.video", "video")
      .leftJoinAndSelect("video.turma", "turma")
      .where("materia.nome IN (:...materiasDoVideo)", { materiasDoVideo })
      .andWhere("materia.video.id != :videoId", { videoId })
      .getMany();
    return videosComMesmaMateria;
  }

  async buscar(id: string): Promise<Materia> {
    const materia = await this.findOne({ where: { id } });
    return materia;
  }
  async remover(id: string): Promise<void> {
    const materia = await this.buscar(id);
    await this.remove(materia);
  }

  async listar(): Promise<Materia[]> {
    const materias = await this.find({ relations: ["video"] });
    return materias;
  }
}

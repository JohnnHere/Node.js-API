import { ICreateMateriaService } from "../../@types/services/IMateriaService";
import { Inject, Service } from "typedi";
import { IMateriaRepository } from "../../@types/repositories/IMateriaRepository";
import { Materia } from "../../models/materia";
import { MateriaDTO } from "../../@types/dto/MateriaDTO";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("CreateMateriaService")
export class CreateMateriaService implements ICreateMateriaService {
  constructor(
    @Inject("MateriaRepository") private materiaRepository: IMateriaRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async criar({ videoId, nome }: MateriaDTO): Promise<Materia> {
    const video = await this.videoRepository.buscar(videoId);

    if (!video) {
      throw new NotFoundError("Vídeo não encontrado.");
    }

    const materia = new Materia();
    Object.assign(materia, { video, nome });

    await this.validationService.validate(materia);

    const novaMateria = await this.materiaRepository.criar({ video, nome });

    return novaMateria;
  }
}

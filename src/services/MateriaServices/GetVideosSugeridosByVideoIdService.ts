import { IMateriaRepository } from "../../@types/repositories/IMateriaRepository";
import { Inject, Service } from "typedi";
import { IGetVideosSugeridosByVideoIdService } from "../../@types/services/IMateriaService";
import { Video } from "../../models/video";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";

@Service("GetVideosSugeridosByVideoIdService")
export class GetVideosSugeridosByVideoIdService
  implements IGetVideosSugeridosByVideoIdService {
  constructor(
    @Inject("MateriaRepository") private materiaRepository: IMateriaRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository
  ) { }
  async listarRecomendados(videoId: string): Promise<Video[]> {
    const video = await this.videoRepository.buscar(videoId);

    if (!video) {
      throw new NotFoundError("O video informado não existe");
    }
    const materias = await this.materiaRepository.listarRecomendados(videoId);


    const videosSugeridos = materias.map((materia) => materia.video);

    this.verficaTurma(video, videosSugeridos);

    this.retiraVideosRepetidos(videosSugeridos);

    return videosSugeridos;
  }
  private verficaTurma(video: Video, videosSugeridosDoVideo: Video[]): void {
    // eslint-disable-next-line prefer-const
    for (let videoSugerido of videosSugeridosDoVideo) {
      if (videoSugerido.turma !== null && video.turma !== null) {
        if (videoSugerido.turma.id !== video.turma.id) {
          videosSugeridosDoVideo.splice(videosSugeridosDoVideo.indexOf(videoSugerido), 1);
        }
      }
    }
  }
  private retiraVideosRepetidos(videosSugeridosDoVideo: Video[]) {
    const idDosVideos = videosSugeridosDoVideo.map(videoSugerido => {
      return videoSugerido.id;
    })

    idDosVideos.forEach(id => {
      const existeMesmoId = idDosVideos.indexOf(id, idDosVideos.indexOf(id) + 1);
      if (existeMesmoId !== -1) {
        videosSugeridosDoVideo.splice(existeMesmoId, 1);
      }
    })
  }
}

import { Historico } from "../../models/historico";
import { Inject, Service } from "typedi";
import { IAddHistoricoService } from "../../@types/services/IHistoricoService";
import { IHistoricoRepository } from "../../@types/repositories/IHistoricoRepository";
import { IVideoRepository } from "../../@types/repositories/IVideoRepository";
import { IAlunoRepository } from "../../@types/repositories/IAlunoRepository";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { HistoricoDTO } from "../../@types/dto/HistoricoDTO";
import { IValidationService } from "../../@types/services/IValidationService";

@Service("AddHistoricoService")
export class AddHistoricoService implements IAddHistoricoService {
  constructor(
    @Inject("HistoricoRepository")
    private historicosRepository: IHistoricoRepository,
    @Inject("VideoRepository") private videoRepository: IVideoRepository,
    @Inject("AlunoRepository") private alunoRepository: IAlunoRepository,
    @Inject("ValidationService") private validationService: IValidationService
  ) {}

  async adicionar({ videoId, alunoId }: HistoricoDTO): Promise<Historico> {
    const historico = new Historico();
    Object.assign(historico, { videoId, alunoId });

    await this.validationService.validate(historico);

    const video = await this.videoRepository.buscar(videoId);
    const aluno = await this.alunoRepository.buscarPorAlunoId(alunoId);

    if (!video) {
      throw new NotFoundError("Video não encontrado");
    }
    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    const historicoExiste = await this.historicosRepository.buscaHistorico({
      videoId,
      alunoId,
    });

    if (historicoExiste) {
      const historicoAtualizado =
        this.historicosRepository.atualizaHistorico(historicoExiste);

      return historicoAtualizado;
    }

    const novoHistorico = await this.historicosRepository.adicionar({
      videoId,
      alunoId,
    });

    return novoHistorico;
  }
}

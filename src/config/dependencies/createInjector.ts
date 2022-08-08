import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { VideoRepository } from "../../repositories/VideoRepository";
import { ComentarioRepository } from "../../repositories/ComentarioRepository";
import { VotoRepository } from "../../repositories/VotoRepository";
import { TurmaRepository } from "../../repositories/TurmaRepository";
import { FavoritoRepository } from "../../repositories/FavoritoRepository";
import { MateriaRepository } from "../../repositories/MateriaRepository";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { AdminRepository } from "../../repositories/AdminRepository";
import { ProfessorRepository } from "../../repositories/ProfessorRepository";
import { AlunoRepository } from "../../repositories/AlunoRepository";
import { HistoricoRepository } from "../../repositories/HistoricoRepository";
import { ProfessorTurmaRepository } from "../../repositories/ProfessorTurmaRepository";

//inicializa clients
import "../../clients/EmailClient";

// inicializa controllers
// video
import "../../controllers/VideoControllers/CreateVideoController";
import "../../controllers/VideoControllers/DeleteVideoController";
import "../../controllers/VideoControllers/GetAllVideosController";
import "../../controllers/VideoControllers/GetVideoByIdController";
import "../../controllers/VideoControllers/UpdateVideoController";
import "../../controllers/VideoControllers/GetVideosByTurmaIdController";
import "../../controllers/VideoControllers/GetVideosPublicosController";

//envia email
import "../../controllers/EmailControllers/EnviaEmailComCodigoController";
import "../../controllers/EmailControllers/EnviaEmailRecuperacaoSenhaController";

// turma
import "../../controllers/TurmaControllers/CreateTurmaController";
import "../../controllers/TurmaControllers/DeleteTurmaController";
import "../../controllers/TurmaControllers/GetTurmaController";
import "../../controllers/TurmaControllers/ListTurmaController";
import "../../controllers/TurmaControllers/UpdateTurmaController";
// comentario
import "../../controllers/ComentarioControllers/CreateComentarioController";
import "../../controllers/ComentarioControllers/DeleteComentarioController";
import "../../controllers/ComentarioControllers/GetComentariosByVideoIdController";
import "../../controllers/ComentarioControllers/UpdateComentarioController";
// voto
import "../../controllers/VotoControllers/CreateVotoController";
import "../../controllers/VotoControllers/DeleteVotoController";
// favorito
import "../../controllers/FavoritoControllers/GetFavoritosByUserIdController";
import "../../controllers/FavoritoControllers/CreateFavoritosController";
import "../../controllers/FavoritoControllers/DeleteFavoritoController";
// matéria
import "../../controllers/MateriaControllers/GetVideosSugeridosByVideoIdController";
import "../../controllers/MateriaControllers/CreateMateriaController";
import "../../controllers/MateriaControllers/DeleteMateriaController";
import "../../controllers/MateriaControllers/GetAllMateriasController";
// usuario
import "../../controllers/UsuarioControllers/GetUsuarioController";
import "../../controllers/UsuarioControllers/ListUsuarioController";
import "../../controllers/UsuarioControllers/UpdateUsuarioController";
import "../../controllers/UsuarioControllers/UpdateSenhaUsuarioController";
import "../../controllers/UsuarioControllers/DeleteUsuarioController";
//autenticação
import "../../controllers/AutenticacaoControllers/LoginController";
import "../../controllers/AutenticacaoControllers/CadastrarAlunoController";
import "../../controllers/AutenticacaoControllers/CadastrarAdminController";
import "../../controllers/AutenticacaoControllers/CadastrarProfessorController";
// historico
import "../../controllers/HistoricoControllers/AddHistoricoController";
import "../../controllers/HistoricoControllers/GetHistoricoByUserIdController";
// professor_turma
import "../../controllers/ProfessorTurmaControllers/CreateProfessorTurmaController";
import "../../controllers/ProfessorTurmaControllers/DeleteProfessorTurmaController";
import "../../controllers/ProfessorTurmaControllers/GetProfessorTurmaByProfessorIdController";

// inicializa services

//envia email
import "../../services/EmailServices/EnviaEmailComCodigoService";
import "../../services/EmailServices/EnviaEmailRecuperacaoSenhaService";

// video
import "../../services/VideoServices/CreateVideoService";
import "../../services/VideoServices/DeleteVideoService";
import "../../services/VideoServices/GetAllVideosService";
import "../../services/VideoServices/GetVideoByIdService";
import "../../services/VideoServices/UpdateVideoService";
import "../../services/VideoServices/GetVideosByTurmaIdService";
import "../../services/VideoServices/GetVideosPublicosService";
// turma
import "../../services/TurmaServices/CreateTurmaService";
import "../../services/TurmaServices/DeleteTurmaService";
import "../../services/TurmaServices/GetTurmaService";
import "../../services/TurmaServices/ListTurmaService";
import "../../services/TurmaServices/UpdateTurmaService";
// comentario
import "../../services/ComentarioServices/CreateComentarioService";
import "../../services/ComentarioServices/DeleteComentarioService";
import "../../services/ComentarioServices/GetComentariosByVideoIdService";
import "../../services/ComentarioServices/UpdateComentarioService";
// voto
import "../../services/VotoServices/CreateVotoService";
import "../../services/VotoServices/DeleteVotoService";
// favorito
import "../../services/FavoritoServices/GetFavoritosByUserIdService";
import "../../services/FavoritoServices/CreateFavoritosService";
import "../../services/FavoritoServices/DeleteFavoritosService";
// materia
import "../../services/MateriaServices/GetVideosSugeridosByVideoIdService";
import "../../services/MateriaServices/CreateMateriaService";
import "../../services/MateriaServices/DeleteMateriaService";
import "../../services/MateriaServices/GetAllMateriasService";
// usuario
import "../../services/UsuarioServices/GetUsuarioService";
import "../../services/UsuarioServices/ListUsuarioService";
import "../../services/UsuarioServices/UpdateUsuarioService";
import "../../services/UsuarioServices/UpdateSenhaUsuarioService";
import "../../services/UsuarioServices/DeleteUsuarioService";
//autenticação
import "../../services/AutenticacaoServices/LoginService";
import "../../services/AutenticacaoServices/CadastrarAlunoService";
import "../../services/AutenticacaoServices/CadastrarProfessorService";
import "../../services/AutenticacaoServices/CadastrarAdminService";
// historico
import "../../services/HistoricoServices/AddHistoricoService";
import "../../services/HistoricoServices/GetHistoricoByUserIdService";
// professor_turma
import "../../services/ProfessorTurmaServices/CreateProfessorTurmaService";
import "../../services/ProfessorTurmaServices/DeleteProfessorTurmaService";
import "../../services/ProfessorTurmaServices/GetProfessorTurmaByProfessorIdService";

// class-validator service
import "../../services/utils/ValidationService";

const createDependencyInjector = () => {
  Container.set("VideoRepository", getCustomRepository(VideoRepository));
  Container.set(
    "ComentarioRepository",
    getCustomRepository(ComentarioRepository)
  );
  Container.set("VotoRepository", getCustomRepository(VotoRepository));
  Container.set("TurmaRepository", getCustomRepository(TurmaRepository));
  Container.set("FavoritoRepository", getCustomRepository(FavoritoRepository));
  Container.set("MateriaRepository", getCustomRepository(MateriaRepository));
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
  Container.set("AdminRepository", getCustomRepository(AdminRepository));
  Container.set(
    "ProfessorRepository",
    getCustomRepository(ProfessorRepository)
  );
  Container.set("AlunoRepository", getCustomRepository(AlunoRepository));
  Container.set(
    "ComentarioRepository",
    getCustomRepository(ComentarioRepository)
  );
  Container.set(
    "HistoricoRepository",
    getCustomRepository(HistoricoRepository)
  );
  Container.set(
    "ProfessorTurmaRepository",
    getCustomRepository(ProfessorTurmaRepository)
  );
};

export default createDependencyInjector;

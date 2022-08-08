export interface CreateVotoDTO {
  comentarioId: string;
  usuarioId: string;
  voto: boolean;
}

export interface DeleteVotoDTO {
  comentarioId: string;
  usuarioId: string;
}

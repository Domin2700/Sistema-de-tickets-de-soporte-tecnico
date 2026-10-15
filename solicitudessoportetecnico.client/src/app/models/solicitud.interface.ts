












export interface Solicitud {
  idSolicitud: number | null;
  nombreSolicitante: string;
  correo: string;
  asunto: string;
  descripcion: string;
  idCategoria: number;
  idPrioridad: number;
  idEstado: number | null;
  resolucion?: string | null;
}


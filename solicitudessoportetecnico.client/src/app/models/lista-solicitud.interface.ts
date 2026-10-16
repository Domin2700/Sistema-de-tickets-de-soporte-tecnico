import { Comentario } from "./comentario.interface";

export interface ListaSolicitudes {
  idSolicitud: number | null;
  nombreSolicitante: string;
  correo: string;
  asunto: string;
  descripcion: string;
  nombreCategoria: string;
  nombrePrioridad: string;
  nombreEstado: string;
  idEstado: number;
  idCategoria: number;
  idPrioridad: number
  fechaCreacion: string;
  codigoSolicitud?: string | null;
  resolucion?: string | null;
  comentarios: Comentario[];
  activo: boolean | null;
}
export interface ActualizarEstado {
idSolicitud: number;
idEstado: number;
resolucion?: string | null;
}

export interface Categoria {
idCategoria: number;
nombreCategoria: string;
activo: boolean;
}

export interface Comentario {
idComentario: number | null;
detalleComentario: string | null;
fechaCreacion: string | null;
idSolicitud: number;
activo: boolean;
}

export interface Estado {
idEstado: number;
nombreEstado: string;
activo: boolean;
}

import { Comentario } from './comentario';

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
  fechaCreacion: string;
  codigoSolicitud?: string | null;
  resolucion?: string | null;
  comentarios: Comentario[];
  activo: boolean | null;
}

export interface Prioridad {
  idPrioridad: number;
  nombrePrioridad: string;
  activo: boolean;
}

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


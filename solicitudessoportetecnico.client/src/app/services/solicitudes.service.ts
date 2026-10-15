import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Categoria } from '../models/categoria.interface';
import { Estado } from '../models/estado.interface';
import { Prioridad } from '../models/prioridad.interface';
import { ListaSolicitudes } from '../models/lista-solicitud.interface';
import { Solicitud } from '../models/solicitud.interface';
import { Comentario } from '../models/comentario.interface';
import { ActualizarEstado } from '../models/actualizar-estado.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private readonly apiUrl = `${environment.apiUrl}/Solicitudes`;

  constructor(private http: HttpClient) {}

  // Obtener categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.apiUrl}/obtenercategorias`
    );

  }

  // Obtener estados
  obtenerEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(
      `${this.apiUrl}/obtenerestados`
    );
  }

  // Obtener prioridades
  obtenerPrioridades(): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(
      `${this.apiUrl}/obtenerprioridades`
    );
  }

  // Obtener solicitudes paginadas
  obtenerSolicitudes(
    pagina: number,
    paginaSize: number
  ): Observable<ListaSolicitudes[]> {
    return this.http.get<ListaSolicitudes[]>(
      `${this.apiUrl}/obtenersolicitudes/${pagina}/${paginaSize}`
    );
  }

  // Guardar una solicitud
  guardarSolicitud(
    solicitud: Solicitud
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/guardarsolicitud`,
      solicitud
    );
  }

  // Guardar un comentario
  guardarComentario(
    comentario: Comentario
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/guardarcomentario`,
      comentario
    );
  }

  // Actualizar estado y resolución
  actualizarEstado(
    estado: ActualizarEstado
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/actualizarestado`,
      estado
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SolicitudesService} from '../../services/solicitudes.service';
import { Categoria } from '../../models/categoria.interface';
import { Estado } from '../../models/estado.interface';
import { Prioridad } from '../../models/prioridad.interface';
import { Solicitud } from '../../models/solicitud.interface';
import { ListaSolicitudes } from '../../models/lista-solicitud.interface';
import { ActualizarEstado } from '../../models/actualizar-estado.interface';

@Component({
  selector: 'app-soporte-tecnico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './soporte-tecnico.component.html'
})
export class SoporteTecnicoComponent implements OnInit {

  // Datos
  solicitudes: ListaSolicitudes[] = [];
  solicitudesFiltradas: ListaSolicitudes[] = [];

  categorias: Categoria[] = [];
  estados: Estado[] = [];
  prioridades: Prioridad[] = [];

  // Filtros locales
  filtroEstado: number | '' = '';
  filtroCategoria: number | '' = '';
  filtroPrioridad: number | '' = '';

  // Estados de la interfaz
  cargando = false;
  error = '';
  errorEstado = '';

  // Diálogo de resolución
  mostrarDialogoResolucion = false;
  solicitudPendiente: ListaSolicitudes | null = null;
  estadoPendiente: number | null = null;
  textoResolucion = '';
  errorResolucion = '';

  // Control de actualización
  actualizandoId: number | null = null;

  constructor(
    private solicitudService: SolicitudesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarSolicitudes();
  }

  abrirComentarios(s: ListaSolicitudes): void {
  this.router.navigate(['/comentarios', s.idSolicitud], {
    state: {
      comentarios: s.comentarios ?? []
    }
  });
}
  // CARGAR CATÁLOGOS

  cargarCatalogos(): void {

    this.solicitudService.obtenerCategorias().subscribe({
      next: (respuesta: Categoria[]) => {
        this.categorias = respuesta;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });

    this.solicitudService.obtenerEstados().subscribe({
      next: (respuesta: Estado[]) => {
        this.estados = respuesta;
      },
      error: (err) => {
        console.error('Error al cargar estados:', err);
      }
    });

    this.solicitudService.obtenerPrioridades().subscribe({
      next: (respuesta: Prioridad[]) => {
        this.prioridades = respuesta;
      },
      error: (err) => {
        console.error('Error al cargar prioridades:', err);
      }
    });

  }

  // CARGAR SOLICITUDES

  cargarSolicitudes(): void {

    this.cargando = true;
    this.error = '';

    // Ajusta la llamada si tu endpoint paginado
    // utiliza una firma diferente.
    this.solicitudService.obtenerSolicitudes(1, 100).subscribe({

      next: (respuesta: ListaSolicitudes[]) => {

        this.solicitudes = respuesta;
        this.aplicarFiltros();

        this.cargando = false;
      },

      error: (err) => {

        console.error('Error al cargar solicitudes:', err);

        this.error = 'No fue posible cargar las solicitudes.';
        this.cargando = false;
      }

    });

  }

  // FILTRAR LOCALMENTE

  aplicarFiltros(): void {

    this.solicitudesFiltradas = this.solicitudes.filter(s => {

      const coincideEstado =
        this.filtroEstado === '' ||
        Number(s.idEstado) === Number(this.filtroEstado);

      const coincideCategoria =
        this.filtroCategoria === '' ||
        Number(s.idCategoria) === Number(this.filtroCategoria);

      const coincidePrioridad =
        this.filtroPrioridad === '' ||
        Number(s.idPrioridad) === Number(this.filtroPrioridad);

      return (
        coincideEstado &&
        coincideCategoria &&
        coincidePrioridad
      );

    });

  }

  // LIMPIAR FILTROS

  limpiarFiltros(): void {

    this.filtroEstado = '';
    this.filtroCategoria = '';
    this.filtroPrioridad = '';

    this.aplicarFiltros();

  }

  // DETECTAR ESTADO RESUELTA

  private esEstadoResuelto(idEstado: number): boolean {

    const estado = this.estados.find(
      e => Number(e.idEstado) === Number(idEstado)
    );

    return (
      estado?.nombreEstado?.trim().toLowerCase() === 'resuelta'
    );

  }

  // SOLICITAR CAMBIO DE ESTADO

  solicitarCambioEstado(
    solicitud: ListaSolicitudes,
    nuevoEstado: number
  ): void {

    if (this.actualizandoId !== null) {
      return;
    }

    // No actualizar si selecciona el mismo estado
    if (Number(solicitud.idEstado) === Number(nuevoEstado)) {
      return;
    }

    this.errorEstado = '';

    // Si selecciona Resuelta, solicitar explicación
    if (this.esEstadoResuelto(nuevoEstado)) {

      this.solicitudPendiente = solicitud;
      this.estadoPendiente = Number(nuevoEstado);
      this.textoResolucion = '';
      this.errorResolucion = '';
      this.mostrarDialogoResolucion = true;

      return;
    }

    // Para otros estados, actualizar directamente
    this.actualizarEstadoEnServidor(
      solicitud,
      Number(nuevoEstado),
      null
    );

  }

  // GUARDAR RESOLUCIÓN

  guardarResolucion(): void {

    if (
      !this.solicitudPendiente ||
      this.estadoPendiente === null
    ) {
      return;
    }

    const resolucion = this.textoResolucion.trim();

    if (!resolucion) {

      this.errorResolucion =
        'Debes escribir una explicación de la solución.';

      return;
    }

    this.actualizarEstadoEnServidor(
      this.solicitudPendiente,
      this.estadoPendiente,
      resolucion
    );

  }

  // ACTUALIZAR ESTADO EN LA BASE DE DATOS

  private actualizarEstadoEnServidor(
    solicitud: ListaSolicitudes,
    nuevoEstado: number,
    resolucion: string | null
  ): void {

    if (this.actualizandoId !== null) {
      return;
    }

    const datos: ActualizarEstado = {
      idSolicitud: solicitud.idSolicitud,
      idEstado: nuevoEstado,
      resolucion: resolucion
    };

    this.actualizandoId = solicitud.idSolicitud;

    this.errorEstado = '';
    this.errorResolucion = '';

    this.solicitudService.actualizarEstado(datos).subscribe({

      next: () => {

        // Actualizar la información local solo después
        // de recibir una respuesta exitosa de la API.
        solicitud.idEstado = nuevoEstado;

        // Cerrar el diálogo si estaba abierto.
        this.mostrarDialogoResolucion = false;
        this.solicitudPendiente = null;
        this.estadoPendiente = null;
        this.textoResolucion = '';

        // Mantener los filtros seleccionados.
        // Solo se recalcula la lista visible.
        this.aplicarFiltros();

        this.actualizandoId = null;

      },

      error: (err) => {

        console.error(
          'Error al actualizar el estado de la solicitud:',
          err
        );

        const mensaje =
          'No se pudo actualizar el estado. Verifica tu conexión e intenta nuevamente.';

        if (this.mostrarDialogoResolucion) {
          this.errorResolucion = mensaje;
        } else {
          this.errorEstado = mensaje;
        }

        // No cambiar el estado local cuando falla la API.
        this.actualizandoId = null;

      }

    });

  }

  // CANCELAR DIÁLOGO DE RESOLUCIÓN

  cancelarResolucion(): void {

    if (this.actualizandoId !== null) {
      return;
    }

    this.mostrarDialogoResolucion = false;
    this.solicitudPendiente = null;
    this.estadoPendiente = null;
    this.textoResolucion = '';
    this.errorResolucion = '';

  }

}

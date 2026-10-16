import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from '../../models/comentario.interface';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentario-form.component.html'
})
export class ComentarioFormComponent implements OnInit {

  idSolicitud!: number;

  detalleComentario = '';
  comentarios: Comentario[] = [];

  guardando = false;
  mensaje = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudesService
  ) {}

  ngOnInit(): void {
    this.idSolicitud = Number(
      this.route.snapshot.paramMap.get('idSolicitud')
    );

    // Recuperar los comentarios enviados desde el listado.
    this.comentarios = history.state?.comentarios ?? [];
  }

  guardarComentario(): void {
    const detalle = this.detalleComentario.trim();

    if (!detalle) {
      this.error = 'Debes escribir un comentario.';
      this.mensaje = '';
      return;
    }

    if (!this.idSolicitud || Number.isNaN(this.idSolicitud)) {
      this.error = 'No se pudo identificar la solicitud.';
      this.mensaje = '';
      return;
    }

    const comentario: Comentario = {
      idComentario: null,
      detalleComentario: detalle,
      fechaCreacion: null,
      idSolicitud: this.idSolicitud,
      activo: true
    };

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.solicitudService.guardarComentario(comentario).subscribe({
      next: () => {
        // Mostrar el comentario recién registrado en la tabla.
        const comentarioGuardado: Comentario = {
          ...comentario,
          fechaCreacion: new Date().toISOString()
        };

        this.comentarios = [
          comentarioGuardado,
          ...this.comentarios
        ];

        this.detalleComentario = '';
        this.mensaje = 'El comentario se registró correctamente.';
        this.guardando = false;
      },
      error: (err) => {
        console.error('Error al guardar el comentario:', err);
        this.error = 'No fue posible guardar el comentario. Intenta nuevamente.';
        this.guardando = false;
      }
    });
  }
}
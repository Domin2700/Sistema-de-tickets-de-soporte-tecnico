
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SolicitudesService} from '../../services/solicitudes.service';
import { Categoria } from '../../models/categoria.interface';
import { Estado } from '../../models/estado.interface';
import { Prioridad } from '../../models/prioridad.interface';
import { Solicitud } from '../../models/solicitud.interface';


@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-form.component.html'
})
export class SolicitudFormComponent implements OnInit {

  categorias: Categoria[] = [];
  prioridades: Prioridad[] = [];
  estados: Estado[] = [];

  mensaje = '';
  error = '';
  cargando = false;

  solicitudForm = new FormGroup({
    nombreSolicitante: new FormControl('', Validators.required),
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    asunto: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    idCategoria: new FormControl<number | null>(
      null, Validators.required
    ),
    idPrioridad: new FormControl<number | null>(
      null, Validators.required
    ),
    idEstado: new FormControl<number | null>(
      null, Validators.required
    )
  });

  constructor(private solicitudService: SolicitudesService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarPrioridades();
    this.cargarEstados();
  }

  cargarCategorias(): void {
    this.solicitudService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data.filter(c => c.activo);
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías.';
      }
    });
  }

  cargarPrioridades(): void {
    this.solicitudService.obtenerPrioridades().subscribe({
      next: (data) => {
        this.prioridades = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar las prioridades.';
      }
    });
  }

  cargarEstados(): void {
    this.solicitudService.obtenerEstados().subscribe({
      next: (data) => {
        this.estados = data.filter(e => e.activo);
      },
      error: () => {
        this.error = 'No se pudieron cargar los estados.';
      }
    });
  }

 

  registrarSolicitud(): void {
    this.mensaje = '';
    this.error = '';

    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      return;
    }

    const datos = this.solicitudForm.getRawValue();

    const solicitud: Solicitud = {
      idSolicitud: null,
      nombreSolicitante: datos.nombreSolicitante!.trim(),
      correo: datos.correo!.trim(),
      asunto: datos.asunto!.trim(),
      descripcion: datos.descripcion!.trim(),
      idCategoria: datos.idCategoria!,
      idPrioridad: datos.idPrioridad!,
      idEstado: datos.idEstado!,
      resolucion: ''
    };

    this.cargando = true;

    this.solicitudService.guardarSolicitud(solicitud).subscribe({
      next: () => {
        this.mensaje = 'Solicitud registrada correctamente.';
        this.limpiarFormulario();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        this.error = 'No se pudo registrar la solicitud.';
        this.cargando = false;
      }
    });
  }

  limpiarFormulario(): void {
    this.solicitudForm.reset();
  }
}

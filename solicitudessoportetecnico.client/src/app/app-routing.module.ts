import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentarioFormComponent } from './components/comentario-form/comentario-form.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'solicitudes',
    pathMatch: 'full'
  },
  {
    path: 'solicitudes',
    loadComponent: () =>
      import('./components/solicitud-form/solicitud-form.component')
        .then(m => m.SolicitudFormComponent)
  },
  {
    path: 'soporte',
    loadComponent: () =>
      import('./components/soporte-tecnico/soporte-tecnico.component')
        .then(m => m.SoporteTecnicoComponent)
  },
   {
  path: 'comentarios/:idSolicitud',
  loadComponent: () =>
    import('./components/comentario-form/comentario-form.component')
      .then(m => m.ComentarioFormComponent)
},
  {
    path: '**',
    redirectTo: 'solicitudes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

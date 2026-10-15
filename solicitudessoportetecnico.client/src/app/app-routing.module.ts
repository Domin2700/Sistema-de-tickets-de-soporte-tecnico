import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
path: '',
redirectTo: 'solicitudes',
pathMatch: 'full'
},
{
path: 'solicitudes',
loadComponent: () =>
import('./components/solicitud-form/solicitud-form.component').then(m => m.SolicitudFormComponent).then(m => m.SolicitudFormComponent)
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

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SoporteTecnicoComponent } from './components/soporte-tecnico/soporte-tecnico.component';
import { ComentarioFormComponent } from './components/comentario-form/comentario-form.component';
import { SolicitudFormComponent } from './/components/solicitud-form/solicitud-form.component';

@NgModule({
  declarations: [
    
     
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    NavbarComponent,
    AppComponent,
   SoporteTecnicoComponent,
   ComentarioFormComponent,
  SolicitudFormComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

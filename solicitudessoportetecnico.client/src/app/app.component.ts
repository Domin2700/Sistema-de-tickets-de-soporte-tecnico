import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from './services/solicitudes.service';  
import { Categoria } from './models/categoria.interface';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[RouterModule,NavbarComponent],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public Categorias : Categoria[] = [];

  constructor( private solicitudesService: SolicitudesService) {}

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() { 
    this.solicitudesService.obtenerCategorias().subscribe(
      (categorias) => {
        this.Categorias = categorias;
        console.log("Categorias",this.Categorias);

      }
    );
 
  }



  title = 'solicitudessoportetecnico.client';
}

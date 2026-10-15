import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from './services/solicitudes.service';  
import { Categoria } from './models/categoria.interface';
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public Categorias : Categoria[] = [];

  constructor(private http: HttpClient, private solicitudesService: SolicitudesService) {}

  ngOnInit() {
    this.getForecasts();
    this.getCategorias();
  }

  getCategorias() { 
    this.solicitudesService.obtenerCategorias().subscribe(
      (categorias) => {
        this.Categorias = categorias;
      }
    );

    console.log(this.Categorias);
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'solicitudessoportetecnico.client';
}

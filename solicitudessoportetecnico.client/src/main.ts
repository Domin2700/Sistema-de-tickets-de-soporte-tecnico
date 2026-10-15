import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

// platformBrowserDynamic().bootstrapModule(AppModule, {
//   ngZoneEventCoalescing: true,
// })
//   .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
    , provideRouter(routes)
  ]
}).catch(err => console.error(err));
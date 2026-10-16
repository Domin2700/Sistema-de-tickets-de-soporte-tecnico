import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from "../../../app-routing.module";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}

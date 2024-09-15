import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { NgClass, NgIf } from '@angular/common';
import { getUser } from './util/app.constants';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent,HttpClientModule,NgClass,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  user: any = null;
  ngOnInit(): void {
    this.user = getUser();
  }
}

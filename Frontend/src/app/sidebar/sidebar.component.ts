import { Component, NgModule, OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { user } from "../util/app.constants";
import { NgClass, NgIf } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule,NgIf,NgClass,RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent implements OnInit {
  user = user;
  ngOnInit(): void {
  }
  constructor(private router: Router){
    
  }
  logout() {
    if (user) {
      localStorage.removeItem('user'); // Remove user from localStorage
      this.router.navigate(['/login']);
      
    }
    
    
  }

}



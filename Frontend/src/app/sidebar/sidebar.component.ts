import { Component, NgModule, OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { getUser } from "../util/app.constants";
import { NgClass, NgIf } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule, NgIf, NgClass, RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent implements OnInit {
  user: any= null;
  ngOnInit(): void {
    this.user = getUser();
  }
  constructor(private router: Router){
    
  }
  logout() {
    if (this.user) {
      localStorage.removeItem('user'); // Remove user from localStorage
      this.router.navigate(['/login']);
      
    }
    
    
  }

}



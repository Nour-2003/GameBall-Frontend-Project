import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { NgClass, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgIf, NgClass, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    if (this.user) {
      this.userService.setUser(null); // This removes the user from localStorage
      this.router.navigate(['/login']); // Redirect to login
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fixed styleUrls property
})
export class NavbarComponent implements OnInit {
  image: any = null;
  user: any = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.image = user?.profileImageUrl;
    });
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }
}

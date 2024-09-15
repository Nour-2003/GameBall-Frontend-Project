import { Component, OnInit } from '@angular/core';
import { getUser, user } from '../util/app.constants';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  image: any= null;
  user: any = null;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.image = user?.profileImageUrl 
    this.user = getUser();
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

}

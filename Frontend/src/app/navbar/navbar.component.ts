import { Component, OnInit } from '@angular/core';
import { getUser, user } from '../util/app.constants';
import { NgIf } from '@angular/common';
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
  ngOnInit(): void {
    this.image = user?.profileImageUrl 
    this.user = getUser();
  }

}

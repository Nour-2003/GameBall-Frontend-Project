import { Component, OnInit } from '@angular/core';
import { user } from '../util/app.constants';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  image: any= null;
  ngOnInit(): void {
    this.image = user?.profileImageUrl 
  }

}

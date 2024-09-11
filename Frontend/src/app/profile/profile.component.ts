import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

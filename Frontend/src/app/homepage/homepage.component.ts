import { Component } from '@angular/core';
import { CreatepostComponent } from "../createpost/createpost.component";
import { PostComponent } from "../post/post.component";
import { ActivefriendsComponent } from "../activefriends/activefriends.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CreatepostComponent, PostComponent, ActivefriendsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}

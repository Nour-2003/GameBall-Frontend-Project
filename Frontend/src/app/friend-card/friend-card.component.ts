import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() friendName: string = '';
  @Input() friendDescription: string = '';
  @Input() friendImage: string = '';
  @Input() isFriend: boolean = false;
}

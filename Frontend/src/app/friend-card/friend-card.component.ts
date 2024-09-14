import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BASE_URL, headers, user } from '../util/app.constants'; // Ensure BASE_URL is correct

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [], // Import necessary modules here
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css'], // Corrected the property name
})
export class FriendCardComponent {
  @Input() friendName: string = '';
  @Input() friendDescription: string = '';
  @Input() friendImage: string = '';
  @Input() isFriend: boolean = false;
  @Input() friendId: number = 0;

  user = user?.id; 

  constructor(private http: HttpClient) {}

  handleFriends() {
    if (!this.isFriend) {
      if (this.user !== undefined) {
        this.addFriend({ senderId: this.user, receiverId: this.friendId });
      }
    } else {
      if (this.user !== undefined) {
        this.removeFriend({ senderId: this.user, receiverId: this.friendId });
      }
    }
  }

  addFriend(data: { senderId: number; receiverId: number }) {
    this.http
      .post(`${BASE_URL}/follow-management/follow`, data, {headers}) 
      .subscribe(() => {
        this.isFriend = true;
        this.friendDescription = 'Friend';
      });
  }

  removeFriend(data: { senderId: number; receiverId: number }) {
    this.http
      .post(`${BASE_URL}/follow-management/unfollow`, data, {headers}) 
      .subscribe(() => {
        this.isFriend = false;
        this.friendDescription = 'Not a friend';
      });
  }

  
}

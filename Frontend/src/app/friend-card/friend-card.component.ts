import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BASE_URL, headers } from '../util/app.constants';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [], // Import necessary modules here
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css'], // Corrected the property name
})
export class FriendCardComponent implements OnInit {
  @Input() friendName: string = '';
  @Input() friendDescription: string = '';
  @Input() friendImage: string = '';
  @Input() isFriend: boolean = false;
  @Input() friendId: number = 0;

  userId: number | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.userId = user?.id;
    });
  }

  handleFriends() {
    if (this.userId !== null) {
      if (!this.isFriend) {
        this.addFriend({ senderId: this.userId, receiverId: this.friendId });
      } else {
        this.removeFriend({ senderId: this.userId, receiverId: this.friendId });
      }
    }
  }

  addFriend(data: { senderId: number; receiverId: number }) {
    this.http
      .post(`${BASE_URL}/follow-management/follow`, data, { headers }) 
      .subscribe(() => {
        this.isFriend = true;
        this.friendDescription = 'Friend';
      });
  }

  removeFriend(data: { senderId: number; receiverId: number }) {
    this.http
      .post(`${BASE_URL}/follow-management/unfollow`, data, { headers }) 
      .subscribe(() => {
        this.isFriend = false;
        this.friendDescription = 'Not a friend';
      });
  }
}

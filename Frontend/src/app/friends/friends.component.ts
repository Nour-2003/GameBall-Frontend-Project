import { Component, OnInit } from "@angular/core";
import { FriendCardComponent } from "../friend-card/friend-card.component";
import { HttpClient } from '@angular/common/http'; 
import { NgFor } from "@angular/common";
import { BASE_URL, headers } from '../util/app.constants';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: "app-friends",
  standalone: true,
  imports: [FriendCardComponent, NgFor],
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],  
})
export class FriendsComponent implements OnInit {
  friendsList: {
    name: string;
    description: string;
    image: string;
    isFriend: boolean;
    friendId: number;
  }[] = [];
  
  myId: number | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.myId = user?.id;
      this.fetchUsersAndFriends();
    });
  }

  fetchUsersAndFriends() {
    if (this.myId === null) return;

    this.http.get<{ body: any[] }>(`${BASE_URL}/users`, { headers }).subscribe(usersResponse => {
      const users = usersResponse.body;

      this.http.get<{ body: any[] }>(`${BASE_URL}/follow-management/following/${this.myId}`, { headers }).subscribe(followingResponse => {
        const friends = followingResponse.body;

        this.friendsList = users
          .filter(user => user.id !== this.myId)  
          .map(user => {
            const isFriend = friends.some(friend => friend.id === user.id);
            return {
              name: user.name,
              description: isFriend ? 'Friend' : 'Not a friend',
              image: user.profileImageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',  // Use default image if null
              isFriend,
              friendId: user.id,
            };
          });
      });
    });
  }
}

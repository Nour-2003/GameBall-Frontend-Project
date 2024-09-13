import { Component, OnInit } from "@angular/core";
import { FriendCardComponent } from "../friend-card/friend-card.component";
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { NgFor } from "@angular/common";
import {BASE_URL,headers}from '../util/app.constants';  // Import BASE_URL from app.constants.ts
@Component({
  selector: "app-friends",
  standalone: true,
  imports: [FriendCardComponent, NgFor],
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],  // Fixed typo (styleUrls instead of styleUrl)
})
export class FriendsComponent implements OnInit {
  friendsList: {
    name: string;
    description: string;
    image: string;
    isFriend: boolean;
  }[] = [];

  myId = 1;  // Replace with the current user's ID or fetch it dynamically

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch users and following data on component initialization
    this.fetchUsersAndFriends();
  }

  fetchUsersAndFriends() {
    // First, fetch all users
    this.http.get<{ body: any[] }>(`${BASE_URL}/users`, { headers }).subscribe((usersResponse) => {
      const users = usersResponse.body;

      // Then, fetch the following list (friends)
      this.http.get<{ body: any[] }>(`${BASE_URL}/follow-management/following/${this.myId}`, { headers }).subscribe((followingResponse) => {
        const friends = followingResponse.body;

        // Map the users and check if they are in the following list
        this.friendsList = users
          .filter(user => user.id !== this.myId)  // Skip if my_id == user_id
          .map(user => {
            const isFriend = friends.some(friend => friend.id === user.id);
            
            return {
              name: user.name,
              description: isFriend ? 'Friend' : 'Not a friend',
              image: user.profileImageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',  // Use default image if null
              isFriend
            };
          });
      });
    });
  }
}

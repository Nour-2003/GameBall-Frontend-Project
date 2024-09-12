import { Component } from "@angular/core";
import { FriendCardComponent } from "../friend-card/friend-card.component";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-friends",
  standalone: true,
  imports: [FriendCardComponent, NgFor],
  templateUrl: "./friends.component.html",
  styleUrl: "./friends.component.css",
})
export class FriendsComponent {
  friendsList: {
    name: string;
    description: string;
    image: string;
    isFriend: boolean;
  }[] = [
    {
      name: "John",
      description: "Best friend",
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
      isFriend: true,
    },
    {
      name: "Jane",
      description: "Close friend",
      image:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      isFriend: false,
    },
    {
      name: "Mike",
      description: "Old friend",
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
      isFriend: true,
    },
    {
      name: "Emily",
      description: "Childhood friend",
      image:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      isFriend: false,
    },
  ];
}

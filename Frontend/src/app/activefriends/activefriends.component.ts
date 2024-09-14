import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, user } from '../util/app.constants';
import { NgFor } from '@angular/common'; // Import NgFor
import { headers } from '../util/app.constants';

@Component({
  selector: 'app-activefriends',
  standalone: true,
  imports: [NgFor], // Import NgFor here
  templateUrl: './activefriends.component.html',
  styleUrls: ['./activefriends.component.css']
})
export class ActivefriendsComponent implements OnInit {
  activeFriends: { name: string; profileImageUrl: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchActiveFriends();
  }

  fetchActiveFriends() {
    this.http.get(`${BASE_URL}/follow-management/following/${user?.id}`,{ headers }).subscribe((response: any) => {
      this.activeFriends = response.body.map((friend: any) => ({
        name: friend.name,
        profileImageUrl: friend.profileImageUrl,
      }));
    });
  }
}

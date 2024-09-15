import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { PostComponent } from '../post/post.component';
import { ActivefriendsComponent } from '../activefriends/activefriends.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers } from '../util/app.constants';
import { UserService } from '../user.service'; // Import UserService

interface Post {
  authorImage: string;
  authorName: string;
  postDate: string;
  postContent: string;
  postImage: string;
  comments: PostComment[];
  postId: number;
}

interface PostComment {
  authorImage: string;
  authorName: string;
  content: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CreatepostComponent, PostComponent, ActivefriendsComponent, NgFor],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'], // Fixed styleUrls property
})
export class HomepageComponent implements OnInit {
  posts: Post[] = [];
  user: any = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.FetchPosts();
    });
  }

  FetchPosts() {
    if (this.user) {
      this.http.get(`${BASE_URL}/posts/home/${this.user?.id}`, { headers }).subscribe((response: any) => {
        this.posts = response.body.map((post: any) => ({
          id: post.id,
          authorImage: post.profileImageUrl,
          authorName: post.authorName || 'Unknown',
          postDate: new Date(post.publishedOn).toLocaleString(),
          postContent: post.content,
          postImage: post.postImageUrl,
          comments: post.comments.map((comment: any) => ({
            authorName: comment.author.name || 'Unknown',
            content: comment.content,
            authorImage: comment.author.profileImageUrl || null,
            commentId: comment.id,
            postId: post.id, 
            isAuth: comment.author.id === this.user?.id,
          })),
          postId: post.id,
        }));
      });
    }
  }
}

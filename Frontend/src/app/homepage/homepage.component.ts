import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { PostComponent } from '../post/post.component';
import { ActivefriendsComponent } from '../activefriends/activefriends.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers, user } from '../util/app.constants';

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
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.FetchPosts();
  }

  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null = null;

  FetchPosts() {
    this.http.get(`${BASE_URL}/posts/home/${user?.id}`, {headers}).subscribe((response: any) => {
      this.posts = response.body.map((post: any) => (console.log(post.authorName)
      ,{
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


import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../util/app.constants';

interface Post {
  id: number;
  authorImage: string;
  authorName: string;
  postDate: string;
  postContent: string;
  postImage: string;
  comments: PostComment[];
  inProfile: boolean;
}

interface PostComment {
  authorImage: string;
  authorName: string;
  content: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PostComponent, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}

  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null = null;

  posts: Post[] = [];

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.FetchPosts();
  }

  FetchPosts() {
    this.http
      .get(`${BASE_URL}/posts/user/${this.user?.id}`)
      .subscribe((response: any) => {
        console.log('Backend response:', response.body);
        this.posts = response.body.map(
          (post: any) => (
            console.log(response),
            {
              id: post.id, // Post ID from the backend
              authorImage: post.profileImageUrl || 'assets/default.png',
              authorName: this.user?.name || 'Unknown',
              postDate: new Date(post.publishedOn).toLocaleString(),
              postContent: post.content,
              postImage: post.postImageUrl || 'assets/default-post-image.png',
              comments: post.comments.map(
                (comment: any) => (
                  console.log('commsnted id', comment.id),
                  {
                    commentId: comment.id,
                    content: comment.content,
                    authorName: comment.author.name || 'Unknown',
                    authorImage:
                      comment.author.profileImageUrl ||
                      'assets/default-profile-image.png',
                    postId: post.id,
                    isAuth: comment.author.id === this.user?.id,
                  }
                )
              ),
              inProfile: true,
            }
          )
        );
      });
  }
}

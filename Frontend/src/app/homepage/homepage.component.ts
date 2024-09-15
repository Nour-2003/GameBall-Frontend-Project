import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { PostComponent } from '../post/post.component';
import { ActivefriendsComponent } from '../activefriends/activefriends.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers, getUser } from '../util/app.constants';

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
  constructor(private http: HttpClient) {
    
  }
  user: any= null;
  ngOnInit(): void {
    this.user = getUser();
    console.log(this.user);
    
    this.FetchPosts();
  }

  
  FetchPosts() {
    this.http.get(`${BASE_URL}/posts/home/${this.user?.id}`, {headers}).subscribe((response: any) => {
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


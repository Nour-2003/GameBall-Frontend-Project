import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { PostComponent } from '../post/post.component';
import { ActivefriendsComponent } from '../activefriends/activefriends.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../util/app.constants';
interface Post {
  authorImage: string;
  authorName: string;
  postDate: string;
  postContent: string;
  postImage: string;
  comments: PostComment[];
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
    this.http.get(`${BASE_URL}/posts`).subscribe((response: any) => {
      this.posts = response.body.map((post: any) => ({
        id: post.id,
        authorImage: post.profileImageUrl,
        authorName: this.user?.name || 'Unknown',
        postDate: new Date(post.publishedOn).toLocaleString(),
        postContent: post.content,
        postImage: post.postImageUrl,
        comments: post.comments.map((comment: any) => ({
          authorName: comment.author.name || 'Unknown',
          content: comment.content,
          authorImage: comment.author.profileImageUrl || null,
        })),
        postId: post.id,
      }));
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { PostComponent } from '../post/post.component';
// import { NgFor } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { BASE_URL } from '../util/app.constants';

// interface Post {
//   id: number;
//   authorImage: string;
//   authorName: string;
//   postDate: string;
//   postContent: string;
//   postImage: string;
//   comments: PostComment[];
// }

// interface PostComment {
//   authorImage: string;
//   authorName: string;
//   content: string;
// }

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [PostComponent, NgFor],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css',
// })
// export class ProfileComponent implements OnInit {
//   constructor(private http: HttpClient) {}

//   user: {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//   } | null = null;

//   posts: Post[] = [];

//   ngOnInit(): void {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       this.user = JSON.parse(userData);
//     }

//     this.FetchPosts();
//   }

//   FetchPosts() {
//     this.http
//       .get(`${BASE_URL}/posts/user/${this.user?.id}`)
//       .subscribe((response: any) => {
//         this.posts = response.body.map((post: any) => ({
//           id: post.id,
//           authorImage: post.profileImageUrl,
//           authorName: this.user?.name || 'Unknown',
//           postDate: new Date(post.publishedOn).toLocaleString(),
//           postContent: post.content,
//           postImage: post.postImageUrl,
//           comments: post.comments.map((comment: any) => ({
//             authorName: comment.author.name || 'Unknown',
//             content: comment.content,
//             authorImage: comment.author.profileImageUrl || null,
//           })),
//           postId: post.id,
//         }));
//       });
//   }
// }

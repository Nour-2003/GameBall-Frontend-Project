import { Component } from "@angular/core";
import { PostComponent } from "../post/post.component";
import { NgFor } from "@angular/common";

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
  selector: "app-profile",
  standalone: true,
  imports: [PostComponent, NgFor],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  posts: Post[] = [
    {
      authorImage:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
      authorName: "Nour Hesham",
      postDate: "4 Hours ago",
      postContent: "Post 1 content",
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRX7zmrU5OWn1HyRDHG1z36Eu7rfGQglKn_g&s",
      comments: [
        {
          authorName: "Nour Hesham",
          content: "Comment 3",
          authorImage:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
        },
        {
          authorName: "Moamen Kadry",
          content: "Comment 4",
          authorImage: "authorImage",
        },
      ],
    },
    {
      authorImage:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
      authorName: "Mazen Sameh",
      postDate: "1 hour ago",
      postContent: "Post 2 content",
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRX7zmrU5OWn1HyRDHG1z36Eu7rfGQglKn_g&s",
      comments: [
        {
          authorName: "Nour Hesham",
          content: "Comment 3",
          authorImage:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
        },
        {
          authorName: "Moamen Kadry",
          content: "Comment 4",
          authorImage: "authorImage",
        },
      ],
    },
  ];
}

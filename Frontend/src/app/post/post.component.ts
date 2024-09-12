import { Component, Input } from "@angular/core";
import { CommentComponent } from "../comment/comment.component";
import { NgFor } from "@angular/common";

interface PostComment {
  authorImage: string;
  authorName: string;
  content: string;
}

@Component({
  selector: "app-post",
  standalone: true,
  imports: [CommentComponent, NgFor],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.css",
})
export class PostComponent {
  @Input() authorImage: string = "";
  @Input() authorName: string = "";
  @Input() postDate: string = "";
  @Input() postContent: string = "";
  @Input() postImage: string = "";
  @Input() comments: PostComment[] = [];
}

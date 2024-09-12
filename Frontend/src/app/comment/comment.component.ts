import { Component, Input } from "@angular/core";

@Component({
  selector: "app-comment",
  standalone: true,
  imports: [],
  templateUrl: "./comment.component.html",
  styleUrl: "./comment.component.css",
})
export class CommentComponent {
  @Input() author: string = "";
  @Input() comment: string = "";
  @Input() authorImage: string = "";
}

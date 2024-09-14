import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../util/app.constants';
import { NgIf } from '@angular/common';
import { headers } from '../util/app.constants';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() author: string = '';
  @Input() comment: string = '';
  @Input() authorImage: string = '';
  @Input() commentId: number = 0;
  @Input() postId: number = 0;
  @Input() IsAuth: boolean = false;

  constructor(private http: HttpClient) {}

  deleteComment() {
    console.log(this.author,this.comment,this.postId,this.commentId);
    
    if (confirm("Are you sure you want to delete this comment?")) {
      this.http.delete(`${BASE_URL}/posts/${this.postId}/comments`,{
        headers,
        body: { commentId: this.commentId },
      }).subscribe({
        next: (response: any) => {
          console.log("Comment deleted successfully", response);
        },
        error: (error) => {
          console.error("Error deleting comment", error);
        }
      });
    }
  }
}

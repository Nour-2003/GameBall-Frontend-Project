import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers } from '../util/app.constants';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() author: string = '';
  @Input() comment: string = '';
  @Input() authorImage: string = '';
  @Input() commentId: number = 0;
  @Input() postId: number = 0;
  @Input() IsAuth: boolean = false;
  @Output() commentDeleted = new EventEmitter<number>();

  isEditing: boolean = false;
  editedComment: string = '';

  constructor(private http: HttpClient) {}

  deleteComment() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this comment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete(`${BASE_URL}/posts/${this.postId}/comments`, {
            headers,
            body: { commentId: this.commentId },
          }).subscribe({
            next: (response: any) => {
              Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
              this.commentDeleted.emit(this.commentId);  // Emit the comment ID to the parent component
            },
            error: (error) => {
              Swal.fire('Error!', 'There was an error deleting your comment.', 'error');
              console.error("Error deleting comment", error);
            }
          });
        }
      });
  
  }

  startEditing() {
    this.isEditing = true;
    this.editedComment = this.comment;
  }

  updateComment(updatedContent: string) {
    const requestBody = {
      commendtId: this.commentId,
      content: updatedContent,
    };

    this.http.put(`${BASE_URL}/posts/${this.postId}/comments`, requestBody, { headers }).subscribe({
      next: (response: any) => {
        console.log("Comment updated successfully", response);
        this.comment = updatedContent;
        this.isEditing = false;
      },
      error: (error) => {
        console.error("Error updating comment", error);
      }
    });
  }

  saveEdit() {
    if (!this.editedComment.trim()) {
      console.error("Edited content is empty");
      return;
    }
    this.updateComment(this.editedComment);
  }

  cancelEdit() {
    this.isEditing = false;
  }
}

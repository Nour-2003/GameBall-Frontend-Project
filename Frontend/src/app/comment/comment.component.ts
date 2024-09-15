import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers } from '../util/app.constants';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgIf,FormsModule],
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

  isEditing: boolean = false; // Flag for edit mode
  editedComment: string = ''; // Store edited content

  constructor(private http: HttpClient) {}

  // Delete Comment Method
  deleteComment() {
    if (confirm("Are you sure you want to delete this comment?")) {
      this.http.delete(`${BASE_URL}/posts/${this.postId}/comments`, {
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

  // Start Edit Mode
  startEditing() {
    this.isEditing = true;
    this.editedComment = this.comment; // Load the current comment into the editor
  }

  // Update Comment Method
  updateComment(updatedContent: string) {
    const requestBody = {
      commendtId: this.commentId,
      content: updatedContent,
    };

    this.http.put(`${BASE_URL}/posts/${this.postId}/comments`, requestBody, { headers }).subscribe({
      next: (response: any) => {
        console.log("Comment updated successfully", response);
        this.comment = updatedContent; // Update the local comment content
        this.isEditing = false; // Exit edit mode
      },
      error: (error) => {
        console.error("Error updating comment", error);
      }
    });
  }

  // Save the Edited Comment
  saveEdit() {
    if (!this.editedComment.trim()) {
      console.error("Edited content is empty");
      return;
    }
    this.updateComment(this.editedComment);
  }

  // Cancel Edit Mode
  cancelEdit() {
    this.isEditing = false;
  }
}

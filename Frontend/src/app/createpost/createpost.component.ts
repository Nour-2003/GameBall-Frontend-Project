import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common'; 
import { UserService } from '../user.service';
import { BASE_URL, headers } from '../util/app.constants'; 

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [FormsModule, NgIf], 
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  postContent: string = ''; 
  selectedImage: File | null = null; 
  userId: number | null = null; 
  userProfileImage: string | null = null; 
  imagePreviewUrl: string | null = null; 

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.userId = user?.id || null;
      this.userProfileImage = user?.profileImageUrl || null;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; 
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result; 
      };
      reader.readAsDataURL(file); 
    }
  }

  createPost() {
    if (!this.postContent.trim()) {
      console.error('Post content is empty');
      return;
    }

    if (this.userId === null) {
      console.error('User ID is not available');
      return;
    }

    
    const formData = new FormData();
    formData.append('Content', this.postContent);
    formData.append('UserId', String(this.userId)); 
    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }

    this.http.post(`${BASE_URL}/posts`, formData, { headers }).subscribe({
      next: (response) => {
        console.log('Post created successfully', response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating post', error);
      },
    });
  }

  resetForm() {
    this.postContent = '';
    this.selectedImage = null;
    this.imagePreviewUrl = null;
  }
}

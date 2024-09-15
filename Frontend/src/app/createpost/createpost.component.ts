import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgIf } from '@angular/common'; // You may use this for conditional rendering
import { UserService } from '../user.service'; // Import UserService
import { BASE_URL, headers } from '../util/app.constants'; // Ensure BASE_URL and headers are correct

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [FormsModule, NgIf], // Import necessary modules
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  postContent: string = ''; // Holds the content of the post
  selectedImage: File | null = null; // Holds the selected image file
  userId: number | null = null; // User ID from UserService
  userProfileImage: string | null = null; // User profile image URL from UserService
  
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.userId = user?.id || null;
      this.userProfileImage = user?.profileImageUrl || null;
    });
  }

  // Function to handle file input change
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0]; // Get the selected file
  }

  // Function to handle form submission
  createPost() {
    if (!this.postContent.trim()) {
      console.error('Post content is empty');
      return;
    }

    if (this.userId === null) {
      console.error('User ID is not available');
      return;
    }

    // Create a FormData object to hold the form fields and file
    const formData = new FormData();
    formData.append('Content', this.postContent);
    formData.append('UserId', String(this.userId)); // Convert userId to string
    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }

    // Send POST request to the backend
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

  // Function to reset the form after submission
  resetForm() {
    this.postContent = '';
    this.selectedImage = null;
  }
}

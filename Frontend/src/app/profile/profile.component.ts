import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, headers } from '../util/app.constants';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserService } from '../user.service'; // Import UserService

interface Post {
  id: number;
  authorImage: string;
  authorName: string;
  postDate: string;
  postContent: string;
  postImage: string;
  comments: PostComment[];
  inProfile: boolean;
}

interface PostComment {
  authorImage: string;
  authorName: string;
  content: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PostComponent, NgFor, FormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Changed to plural (styleUrls)
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  user: any = null;

  // Fields for editing profile
  editMode: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  address: string = '';
  profileImage: File | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.name = this.user.name;
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.address = this.user.address;

        this.FetchPosts(); // Fetch posts after user data is loaded
      }
    });
  }

  FetchPosts() {
    if (this.user) {
      this.http.get(`${BASE_URL}/posts/user/${this.user.id}`, { headers })
        .subscribe((response: any) => {
          console.log('Backend response:', response.body);
          this.posts = response.body.map((post: any) => ({
            id: post.id,
            authorImage: post.profileImageUrl,
            authorName: post.authorName || 'Unknown',
            postDate: new Date(post.publishedOn).toLocaleString(),
            postContent: post.content,
            postImage: post.postImageUrl,
            comments: post.comments.map((comment: any) => ({
              commentId: comment.id,
              content: comment.content,
              authorName: comment.author.name || 'Unknown',
              authorImage: comment.author.profileImageUrl,
              postId: post.id,
              isAuth: comment.author.id === this.user?.id,
            })),
            inProfile: true,
          }));
        });
    }
  }

  // File selection handler
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

  // Update profile information
  updateProfile() {
    if (!this.user || !this.user.id) {
      console.error('User not found');
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.name);
    formData.append('Email', this.email);
    formData.append('Password', this.password); // Password can be blank if not updating
    formData.append('Phone', this.phone);
    formData.append('Address', this.address);

    if (this.profileImage) {
      formData.append('ProfileImage', this.profileImage);
    }

    this.http.put(`${BASE_URL}/users/${this.user.id}`, formData, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Profile updated successfully', response);

          // Update local storage with new user data
          const updatedUser = { 
            ...this.user, 
            name: this.name, 
            email: this.email, 
            phone: this.phone, 
            address: this.address, 
            profileImageUrl: response.profileImageUrl 
          };
          this.userService.setUser(updatedUser); // Update user in UserService
          this.editMode = false; // Exit edit mode
        },
        error: (error) => {
          console.error('Error updating profile', error);
        }
      });
  }

  // Toggle edit mode
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}

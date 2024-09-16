import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BASE_URL, headers } from '../util/app.constants';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Add errorMessage property
  loading: boolean = false; // Add loading property

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private userService: UserService // Inject UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  login(data: { email: string; password: string }) {
    this.loading = true; // Show loader
    this.http.post(`${BASE_URL}/users/login`, data, { headers }) 
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login. Please try again.';
          this.loading = false; // Hide loader
          return of(null); 
        })
      )
      .subscribe((response: any) => {
        this.loading = false; // Hide loader
        if (response && (response as any).statusCode === 201) {
          const responseBody = (response as any).body;
          console.log(responseBody);
          localStorage.setItem('user', JSON.stringify(responseBody)); 
          this.userService.setUser(responseBody); // Update user in UserService
          this.router.navigate(['home']);
        } else {
          console.log('Login failed');
          this.errorMessage = response.message;
          console.log(response);
        }
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

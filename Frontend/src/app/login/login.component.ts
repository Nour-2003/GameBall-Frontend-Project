import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router'; // For redirect after login
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BASE_URL } from '../util/app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Call the login function
      this.login(this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Login function that sends data to backend
  login(data: { email: string; password: string }) {
    this.http.post(`${BASE_URL}/users/login`, data) // Replace with your API URL
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          return of(null); // Handle errors
        })
      )
      .subscribe(response => {
        if (response && (response as any).statusCode === 201) {
          const responseBody = (response as any).body;
          console.log(responseBody);
          localStorage.setItem('user',JSON.stringify(responseBody));
          this.router.navigate(['/']);
        } else {
          console.log('Login failed');
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

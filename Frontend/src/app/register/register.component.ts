import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';  
import { BASE_URL, headers } from '../util/app.constants';  

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false; // Add loading state
  errorMessage: string | null = null; // Add error message state

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      address: ['', [Validators.required]]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true; // Show loader
      this.errorMessage = null; // Reset error message

      const requestData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address
      };

      this.http.post(`${BASE_URL}/users/register`, requestData, {headers}).subscribe(
        (response: any) => {
          if(response.statusCode === 201) {
            console.log('User registered successfully:', response);
            this.router.navigate(['/login']);
          }else{
            console.error('Registration failed:', response);
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.error('Error during registration:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      ).add(() => {
        this.loading = false; // Hide loader after response
      });
    } else {
      console.log('Form is invalid');
    }
  }

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.get(password);
      const confirmPass = formGroup.get(confirmPassword);

      if (!pass || !confirmPass) {
        return;
      }

      if (confirmPass.errors && !confirmPass.errors['mustMatch']) {
        confirmPass.setErrors(null);
      }

      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ mustMatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get gender() { return this.registerForm.get('gender'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address'); }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LoginRequest, CurrentUserResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmailAA: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  //     const formValue = this.loginForm.value;
      
  //     // Determine if input is email or username
  //     const isEmail = this.isValidEmail(formValue.usernameOrEmail);
      
  //     const loginRequest: LoginRequest = {
  //       username: isEmail ? '' : formValue.usernameOrEmail,
  //       email: isEmail ? formValue.usernameOrEmail : '',
  //       password: formValue.password
  //     };
      
  //     this.authService.login(loginRequest).subscribe({
  //       next: (user: CurrentUserResponse) => {
  //         this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error) => {
  //         this.loading = false;
  //         this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 3000 });
  //         console.error('Login error:', error);
  //       }
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const formValue = this.loginForm.value;
  
      // Determine if input is email or username
      const isEmail = this.isValidEmail(formValue.usernameOrEmailAddress);
  
      const loginRequest: LoginRequest = {
        username: isEmail ? '' : formValue.usernameOrEmailAA,
        email: isEmail ? formValue.usernameOrEmailAA : '',
        password: formValue.password
      };
      
      console.log("loginRequest:", loginRequest);
      
      const validUsername = 'thbs';
      const validEmail = 'thbs@thbs.com';
      const validPassword = 'qwe123';
  
      const isValidUser =
        (loginRequest.username?.toLowerCase() === validUsername ||
         loginRequest.email?.toLowerCase() === validEmail) &&
        loginRequest.password === validPassword;
  
      console.log(isValidUser);
  
      if (isValidUser) {
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.loading = false;
        this.snackBar.open('Invalid credentials. Please try again.', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', { duration: 3000 });
    }
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}

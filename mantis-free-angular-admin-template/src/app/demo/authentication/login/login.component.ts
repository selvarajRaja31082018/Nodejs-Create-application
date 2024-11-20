import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  // Define the login form with validation
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Inject AuthService and Router using inject() method
  authService = inject(AuthService);
  router = inject(Router);

  // To store the error message
  loginError: string | null = null;

  onSubmit() {
    // First, check if the login form is valid
    if (this.loginForm.valid) {
      // Call the login method from AuthService with form data
      this.authService.login(this.loginForm.value)
        .subscribe(
          (data: any) => {

            console.log(data); 
            // Check if login is successful
            if (data.status == '0' && this.authService.isLoggedIn()) {
              // If logged in, navigate to the dashboard
              this.router.navigate(['/dashboard/default']);
            } else {
              // Handle login failure, set error message to display in template
              this.loginError = 'Invalid email or password.';
            }
          },
          (error) => {
            // Handle HTTP or network errors
            console.error('Error:', error);
            this.loginError = 'Login error. Please try again later.';
          }
        );
    } else {
      // If form is invalid, set error message
      this.loginError = 'Please fill in valid email and password.';
    }
  }

  // Social Sign-In options
  public SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  SignUpOptions = [
    { name: 'Google', image: 'assets/images/google.png' }, // Replace with actual images
    { name: 'Facebook', image: 'assets/images/facebook.png' },
    { name: 'Twitter', image: 'assets/images/twitter.png' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the form group in the constructor
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // 10-digit mobile validation
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, mobile,password } = this.registerForm.value;

      // Call the AuthService register method
      this.authService.register({ firstName, lastName, email,mobile, password }).subscribe(
        response => {
          // Handle successful registration here
          console.log('Registration successful', response);
          this.router.navigate(['/login']);  // Navigate to login page after registration
        },
        error => {

          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';

          // Handle registration error here
          console.error('Registration error', error);
          // Optionally, display the error to the user
      //    alert('Registration failed: ' + error.error?.message || 'Unknown error'); // Adjust based on your error structure
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';

      // Optionally, display a validation error message
     // alert('Please fill in the form correctly.');
    }
  }



  
}

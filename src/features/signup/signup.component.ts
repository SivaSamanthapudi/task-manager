import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private userService = inject(UserService);
  users = this.userService.users;
  registrationSuccess: any;

  registerForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const userData = {
      firstName: this.registerForm?.value?.firstName,
      lastName: this.registerForm?.value?.lastName,
      dateOfBirth: this.registerForm?.value?.dateOfBirth,
      email: this.registerForm?.value?.email,
      password: this.registerForm.value?.password,
    };
    this.registerUser(userData);
  }

  registerUser(userData: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
  }) {
    this.userService.registerUser(userData).subscribe(
      (res) => {
        this.userService.addUserToSignal(res.user);
        this.registrationSuccess = res.registered;
        this.navigateToLogin();
      },
      (error) => {
        console.error('Error registering user:', error);
        this.handleRegistrationError(error);
      },
    );
  }

  handleRegistrationError(error: any) {
    if (error.error && error.error.code === 'EMAIL_REGISTERED_ALREADY') {
      alert('This email is already registered. Please use a different email.');
    }
  }

  navigateToLogin() {
    if (!this.registrationSuccess) return;
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }
}

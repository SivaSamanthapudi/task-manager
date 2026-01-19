import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm) {
    this.userService.authenticateUser(loginForm.value.email, loginForm.value.password).subscribe(
      (res) => {
        console.log('Login successful:', res);
        this.isLoggedIn = true;
        // localStorage.setItem('jwt_token', res.token);
        this.authService.setAuthToken(res.token);
        this.authService.setLoggedUserInfo(res.user.firstName);
        // this.router.navigateByUrl('/posts');
      },
      (error) => {
        console.error('Error during login:', error);
        this.handleLoginError(error);
      },
    );
  }

  handleLoginError(error: any) {
    if(error.error && error.error.code === 'USER_EMAIL_NOT_FOUND') {
      alert('No account found with this email. Please sign up first.');
    } else if (error.error && error.error.code === 'INVALID_CREDENTIALS') {
      alert('Incorrect credentials. Please try again.');
    }
  }

  onForgot(){
    this.router.navigateByUrl('/forgot-password');
  }
}

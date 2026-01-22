import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LoginComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {}
}

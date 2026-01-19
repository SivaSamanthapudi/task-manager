import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LoginComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  ngOnDestroy(): void {}
}

import { SharedService } from './../../services/shared.service';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../shared/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logOutUser();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

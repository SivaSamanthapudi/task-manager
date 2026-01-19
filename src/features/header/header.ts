import { SharedService } from './../../services/shared.service';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
})
export class HeaderComponent {
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    public authService: AuthService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.setAuthToken(null);
    this.router.navigateByUrl('/login');
    this.sharedService.clearCache();
  }
}

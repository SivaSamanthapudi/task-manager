import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../features/header/header';
import { ToastComponent } from '../shared/toast/toast.component';
import { ToasterService } from '../services/toast.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('User');
  private toasterService = inject(ToasterService);
  showToaster = this.toasterService.showToasterMessage;
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}

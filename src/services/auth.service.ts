import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_API_URL } from '../utils/constants/url.constants';
import { Route, Router } from '@angular/router';
import { SharedService } from './shared.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  user: string = '';
  private _isLoggedIn = signal<boolean>(false);
  isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();
  timer: NodeJS.Timeout | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
  ) {}

  setToken(token: string) {
    this.token = `Bearer ${token}`;
    localStorage.setItem('access_token', token);
    if (token === '') {
      this._isLoggedIn.set(false);
      return;
    }
    this._isLoggedIn.set(true);
  }

  getToken(): string | null {
    return this.token;
  }

  setLoggedUserInfo(userInfo: string) {
    this.user = userInfo;
  }

  getLoggedUserInfo(): string {
    return this.user;
  }

  authenticateUser(email: string, password: string) {
    const USER_LOGIN_API_URL = `${USER_API_URL}/login`;
    this.http.post<any>(USER_LOGIN_API_URL, { email, password })
    .subscribe((res) => {
      const expiresInDuration = res.expiresIn * 1000; // e.g., 3600 seconds -> ms
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration);

      this.setToken(res.token);
      this.setLoggedUserInfo(res.user.firstName);

      // Save the absolute expiration date
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('user_name', res.user.firstName);

      this.setAutoLogoutTimer(expiresInDuration);
      this.userService.getUsers();
      this.router.navigate(['/']);
    }),
    (error) => {
      this.handleLoginError(error);
    };

  }

  autoLogin() {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('expiration');
    const savedUser = localStorage.getItem('user_name');

    if (!token || !expirationDate) {
      return;
    }

    const now = new Date();
    const expiry = new Date(expirationDate);

    if (expiry > now) {
      // Session is still valid!
      this.setToken(token);
      this.setLoggedUserInfo(savedUser || '');

      // Calculate remaining time for the timer
      const remainingTime = expiry.getTime() - now.getTime();
      this.setAutoLogoutTimer(remainingTime);
    } else {
      // Session expired while user was away
      this.logOutUser();
    }
  }

  private setAutoLogoutTimer(duration: number) {
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.logOutUser();
    }, duration);
  }

  logOutUser() {
    this.sharedService.clearCache();
    this.setToken('');
    this._isLoggedIn.set(false);
    this.clearSession();
    if (this.timer) clearTimeout(this.timer);
    this.router.navigateByUrl('/login');
  }

  clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user_name');
  }

  handleLoginError(error: any) {
    if (error.error && error.error.code === 'USER_EMAIL_NOT_FOUND') {
      alert('No account found with this email. Please sign up first.');
    } else if (error.error && error.error.code === 'INVALID_CREDENTIALS') {
      alert('Incorrect credentials. Please try again.');
    }
  }
}

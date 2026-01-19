import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sign, sign } from 'crypto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  user: string;
  private _isLoggedIn = signal<boolean>(false);
  isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {}

  setAuthToken(token: string) {
    this.token = `Bearer ${token}`;
    if (token === null) {
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
}

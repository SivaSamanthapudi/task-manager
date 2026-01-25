import { USER_API_URL } from '../utils/constants/url.constants';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get<{ message: string; users: any[] }>(USER_API_URL)
      .subscribe((res) => this._users.set(res.users));
  }

  registerUser(user: any): Observable<any> {
    const USER_REGISTER_API_URL = `${USER_API_URL}/register`;
    return this.http.post<any>(USER_REGISTER_API_URL, user);
  }

  addUserToSignal(user: any): void {
    this._users.update((users) => [...users, user]);
  }

  isUserRegistered(email: string): boolean {
    const users = this._users();
    return users.some((user) => user.email === email);
  }

  getUserNameById(userId: string) {
    const users = this._users();
    return users.find((user) => user._id === userId)?.firstName;
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Get the token from your AuthService
    const authToken = this.authService.getToken();

    // 2. Clone the request and add the Authorization header
    // We clone because the original request is immutable
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `${authToken}`)
    });

    // 3. Send the cloned, "authorized" request on its way
    return next.handle(authRequest);
  }
}
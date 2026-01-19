import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);  
  const isAuthenticated = authService.isLoggedIn();
  if (!isAuthenticated) {
    alert('You must be logged in to access this page.');
    router.navigateByUrl('login')
    return false;
  }  
  return isAuthenticated;
};

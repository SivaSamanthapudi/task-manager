import { Routes } from '@angular/router';
import { PostsComponent } from '../features/posts/posts.component';
import { UsersComponent } from '../features/users/users';
import { PageNotFoundComponent } from '../features/page-not-found/page-not-found';
import { TasksComponent } from '../features/tasks/tasks.component';
import { HomeComponent } from '../features/home/home.component';
import { LoginComponent } from '../features/login/login.component';
import { SignupComponent } from '../features/signup/signup.component';
import { ForgotComponent } from '../features/forgot/forgot.component';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: 'posts', component: PostsComponent, pathMatch: 'full', canActivate: [authGuard] },
  {
    path: 'tasks',
    component: TasksComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    component: ForgotComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: '*',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];

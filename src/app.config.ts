import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app/app.routes';
import { PostsEffects } from './app/state/posts/posts.effects';
import { postsFeatureKey, postsReducer } from './app/state/posts/posts.reducer';
import { TasksEffects } from './app/state/tasks/tasks.effects';
import { tasksFeatureKey, tasksReducer } from './app/state/tasks/tasks.reducer';
import { environment } from './environments/environment.development';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
  // provideHttpClient with interceptors wired to DI
  provideHttpClient(withInterceptorsFromDi()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },

  // NgRx integration - ensure store is provided before effects
  provideStore({
    [postsFeatureKey]: postsReducer,
    [tasksFeatureKey]: tasksReducer,
  }),
  provideEffects(PostsEffects, TasksEffects),
  provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
]
};
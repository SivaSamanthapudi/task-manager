import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

// NgRx providers
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { postsFeatureKey, postsReducer } from './app/state/posts/posts.reducer';
import { tasksFeatureKey, tasksReducer } from './app/state/tasks/tasks.reducer';
import { PostsEffects } from './app/state/posts/posts.effects';
import { TasksEffects } from './app/state/tasks/tasks.effects';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()), // Enable DI-based interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Allows for multiple interceptors in the project
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true, // Allows for multiple interceptors in the project
    },

    // NgRx integration
    provideStore({ [postsFeatureKey]: postsReducer, [tasksFeatureKey]: tasksReducer }),
    provideEffects([PostsEffects, TasksEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),

  ],
}).catch((err) => console.error(err));

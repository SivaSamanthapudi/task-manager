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
  ],
}).catch((err) => console.error(err));

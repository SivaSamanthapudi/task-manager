import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToasterService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToasterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.toasterService.closeToaster();

          if (event.status === 200 || event.status === 201) {
            const isToasterRequired = this.toasterService.getErrorInfo(event.body?.code);
            if (isToasterRequired) {
              this.toasterService.setErrorCode(event.body?.code);
              this.toasterService.showToaster();
            }
          }
        }
      }),

      catchError((error: HttpErrorResponse) => {
        this.toasterService.closeToaster();

        if (error.status === 500 || error.status === 401 || error.status === 409) {
          this.toasterService.setErrorCode(error.error?.code);
          this.toasterService.showToaster();
        }

        if (error.status === 400) {
          // validation error
        }

        if (error.status === 403) {
          // Forbidden
          // this.router.navigate(['/login']);
        }

        return throwError(() => error);
      }),
    );
  }
}

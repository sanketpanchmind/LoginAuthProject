import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    let authReq = request;

    if(token){
      authReq = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    this.spinner.show(); 

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.spinner.hide(); // Hide spinner when request completes (success or error)
      }),
    )
  }
}

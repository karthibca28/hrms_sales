import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators'; 
import { LoaderService } from './loader.service';
// import { SharedService } from './services/shared.service';
// import { LoaderService } from './services/loader.service';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  token = '';
  constructor(
    private loader: LoaderService,
    // private sharedService: SharedService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any; 
    if (userData) {
      this.token = userData.accessToken; 
    } 
      auth = request.clone({
        headers: request.headers
          .set('Authorization', `${this.token}`)
          // .set('Access-Control-Allow-Origin', 'true')
          .append('Accept', 'application/json'),
        responseType: 'json'
      }); 

    this.loader.show();
    return next.handle(auth).pipe(
      tap((response) => {
        //console.log(response)
        this.loader.hide();
      }),
      // finalize(() => {
      //   this.loader.hide();
      // }).,
      catchError((error: HttpErrorResponse) => {
        this.loader.hide();
        if (error.status === 403) { 
          // permission error
        }
        if (error.status === 401) {
          // this.sharedService.showMessage('UnAuthorized', 'error-snackbar');
        }
        return throwError(error);
      })
    );
  }
}

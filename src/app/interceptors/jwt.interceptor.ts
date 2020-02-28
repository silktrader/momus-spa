import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.hasAdminLogged) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}

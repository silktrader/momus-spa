import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private as: AuthenticationService) {}
  canActivate() {
    const token = this.as.token;
    if (token) {
      return true;
    }
    console.log('MUST AUTHENTICATE'); // tk
    return false;
  }
}

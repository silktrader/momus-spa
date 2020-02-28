import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenName = 'access_token';
  private readonly adminName = 'admin';

  private readonly url = `${environment.backendUrl}/auth/login`;
  private readonly adminSubject$: BehaviorSubject<boolean>;
  public readonly admin$: Observable<boolean>;

  constructor(private http: HttpClient) {
    // set to null when local storage isn't initialised
    const token = this.token;
    this.adminSubject$ = new BehaviorSubject<boolean>(token !== null); // tk change name
    this.admin$ = this.adminSubject$.asObservable();
  }

  public get token(): string {
    return localStorage.getItem(this.tokenName);
  }

  public login(password: string) {
    console.log('Trying to log in with ' + password);
    this.http
      .post<{ token: string }>(this.url, { name: this.adminName, password })
      .subscribe(
        response => {
          console.log('logged in!!');
          localStorage.setItem(this.tokenName, response.token);
          this.adminSubject$.next(true);
        },
        err => {
          console.log('couldnt log in');
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.tokenName);
    this.adminSubject$.next(false);
  }

  get hasAdminLogged(): boolean {
    return this.adminSubject$.value;
  }
}

import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WEB_SERVICES } from '../Const/Config';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http.post<JwtTokenResponse>(`${WEB_SERVICES}/authenticate`, user).pipe(
      map(data => {
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('token', `Bearer ${data.token}`);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }
}

export class JwtTokenResponse {
  token: string;
}

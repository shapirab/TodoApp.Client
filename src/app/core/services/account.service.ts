import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserToReturn } from '../models/user/userToReturn';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/user/login';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  currentUser = signal<UserToReturn | null | undefined>(undefined);

  private http = inject(HttpClient);

  login(values: any) {
    return this.http.post<Login>(`${this.baseUrl}/account/login`, values, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        switchMap(() => this.getUserInfo())
      );
  }

  register(values: any) {
    return this.http.post(`${this.baseUrl}/account/register`, values, {withCredentials: true});
  }

  getUserInfo() {
    return this.http.get<UserToReturn>(`${this.baseUrl}/account/user-info`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.setUserHintCookie(user.email); // keep cookie in sync
            this.currentUser.set(user);
          } else {
            this.setUserHintCookie(null);
            this.currentUser.set(null);
          }
        })
      );
  }

   private setUserHintCookie(email: string | null) {
    const name = 'bb_user';
    document.cookie = email
      ? `${name}=${encodeURIComponent(
          email
        )}; Path=/; Max-Age=2592000; SameSite=None; Secure`
      : `${name}=; Path=/; Max-Age=0; SameSite=None; Secure`;
  }
}

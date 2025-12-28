import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserToReturn } from '../models/user/userToReturn';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/user/login';
import { catchError, of, switchMap, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  currentUser = signal<UserToReturn | null | undefined>(undefined);

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(values: any) {
    return this.http.post<Login>(`${this.baseUrl}/account/login`, values, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        switchMap(() => this.getUserInfo()),
        tap(() => {
        this.getUserInfo().subscribe();
      })
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
          }
          // else {
          //   this.setUserHintCookie(null);
          //   this.currentUser.set(null);
          // }
        }),
        catchError((error) => {
          console.error('Error fetching user info:', error);
          this.currentUser.set(null);
          return of(null);
        })
      );
  }

  logout(){
    console.log('accountService:logout() called')
    return this.http.post(`${this.baseUrl}/account/logout`, {}, {withCredentials:true});
  }

   private setUserHintCookie(email: string | null) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const name = 'bb_user';
    document.cookie = email
      ? `${name}=${encodeURIComponent(
          email
        )}; Path=/; Max-Age=2592000; SameSite=None; Secure`
      : `${name}=; Path=/; Max-Age=0; SameSite=None; Secure`;
  }
}

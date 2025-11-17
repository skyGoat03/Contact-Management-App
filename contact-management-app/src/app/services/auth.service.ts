import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap, of } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, CurrentUserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5001/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadUserFromStorage();
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/user/register`, request);
  }

  login(request: LoginRequest): Observable<CurrentUserResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/user/login`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        switchMap(() => this.getCurrentUser())
      );
  }

  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http.post<CurrentUserResponse>(`${this.API_URL}/user/current`, {})
      .pipe(
        tap(user => {
          const userObj: User = {
            id: user.id,
            username: user.username,
            email: user.email
          };
          this.currentUserSubject.next(userObj);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(userObj));
          }
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserFromStorage(): User | null {
    return this.currentUserSubject.value;
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', response.accessToken);
    }
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.currentUserSubject.next(user);
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
        }
      }
    }
  }
}

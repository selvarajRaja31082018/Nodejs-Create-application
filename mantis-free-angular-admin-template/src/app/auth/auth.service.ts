import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Missing Observable import
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Use the baseUrl from environment variables if applicable
  //baseUrl = environment.apiUrl || 'http://localhost:3000';

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api/users';
  // Login method
  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(
        tap((result: any) => {
          localStorage.setItem('authUser', JSON.stringify(result));
        })
      );
  }

  // Register method
  register(data: { firstName: string, lastName: string, email: string, mobile: number, password: string }): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, data)
      .pipe(
        tap((result: any) => {
          if (result.status === '1') {  // Ensure your backend returns a 'status' field
            localStorage.setItem('registeredUser', JSON.stringify(result));
          }
        })
      );
  }

  // Get all users
  // getAllUsers(): Observable<any[]> {
  //   return this.httpClient.get<any[]>(`${this.baseUrl}/getAll`);
  // }


  getAllUsers(page: number, itemsPerPage: number): Observable<any> {
    return this.http.get<any>(`/api/getAll?page=${page}&limit=${itemsPerPage}`);
  }

  

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authUser');
  }
}

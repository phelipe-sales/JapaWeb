import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../models/apiResponse';
import { LoginResponse } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/v1/login`;

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(this.apiUrl, credentials);
  }
}
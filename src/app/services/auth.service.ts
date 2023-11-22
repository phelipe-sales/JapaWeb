import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../types/apiResponse.interface';
import { LoginResponse } from '../types/loginResponse.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7007/api/Auth/v1/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<LoginResponse>> {

    const requestBody = {
      username: credentials.username,
      password: credentials.password
    };

    return this.http.post<ApiResponse<LoginResponse>>(this.apiUrl, requestBody);
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/apiResponse';
import { LoginResponse } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/v1/`;

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<LoginResponse>> {
    const url = `${this.apiUrl}login`;
    return this.http.post<ApiResponse<LoginResponse>>(url, credentials);
  }

  signOutExternal = () => {
    localStorage.removeItem("jwtToken");
    console.log("token deleted");
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const url = `${this.apiUrl}login-with-google`;
    return this.http.post(url, JSON.stringify(credentials), {headers: header});
  }
}
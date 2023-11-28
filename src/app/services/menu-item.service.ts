import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MenuItem } from '../types/menu-item.interface';
import { ApiResponse, PagingResult } from '../types/apiResponse.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl: string = `${environment.apiUrl}MenuItem/v1/`;

  constructor(private http: HttpClient, private router: Router) { }

  getAllMenuItems(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<MenuItem>>> {
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<MenuItem>>>(url);
  }

  updateMenuItem(menuItem: MenuItem): Observable<ApiResponse<MenuItem>> {
    const url = `${this.apiUrl}update`;
    return this.http.put<ApiResponse<MenuItem>>(url, menuItem);
  }
}
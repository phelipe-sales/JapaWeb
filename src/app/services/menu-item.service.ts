import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ApiResponse, PagingResult } from '../models/apiResponse';
import { MenuItemResult } from '../models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl: string = `${environment.apiUrl}menuItem/v1/`;

  constructor(private http: HttpClient) { }

  createMenuItem(createMenuItem: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    ingredientsName: string[];
    categoryName: string;
    isRodizioItem: boolean;
    isAvailable: boolean;
  }): Observable<ApiResponse<MenuItemResult>> {
    const url = `${this.apiUrl}create`;
    return this.http.post<ApiResponse<MenuItemResult>>(url, createMenuItem);
  }

  getAllMenuItems(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<MenuItemResult>>> {
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<MenuItemResult>>>(url);
  }

  updateMenuItem(menuItem: MenuItemResult): Observable<ApiResponse<MenuItemResult>> {
    const url = `${this.apiUrl}update`;
    return this.http.put<ApiResponse<MenuItemResult>>(url, menuItem);
  }

}
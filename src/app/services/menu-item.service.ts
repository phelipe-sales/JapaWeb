import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ApiResponse, PagingResult } from '../models/apiResponse';
import { MenuItemResult } from '../models/menuItem';
import { SortDirection } from '@angular/material/sort';

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

  getAll(
    searchTerm: string,
    sort: string,
    order: SortDirection,
    page: number,
    perpage: number
  ): Observable<any> {
    const apiUrl = 'https://localhost:7007/api/MenuItem/v1/get-all';
    const params = new HttpParams()
      .set('SearchTerm', searchTerm)
      .set('PageIndex', page)
      .set('PageSize', perpage)
      .set('SortColumn', sort)
      .set('SortOrder', order);

    return this.http.get<any>(apiUrl, { params });
  }

  updateMenuItem(menuItem: MenuItemResult): Observable<ApiResponse<MenuItemResult>> {
    const url = `${this.apiUrl}update`;
    return this.http.put<ApiResponse<MenuItemResult>>(url, menuItem);
  }

  searchMenuItem(searchTerm: string): Observable<ApiResponse<PagingResult<MenuItemResult>>> {
    const url = `${this.apiUrl}search?SearchTerm=${searchTerm}`;
    return this.http.get<ApiResponse<PagingResult<MenuItemResult>>>(url);
  }
}
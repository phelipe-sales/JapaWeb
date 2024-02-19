import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PagingResult } from '../models/apiResponse';
import { CategoryResult } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `${environment.apiUrl}category/v1/`;

  constructor(private http: HttpClient) { }

  getAllCategories(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<CategoryResult>>> {
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<CategoryResult>>>(url);
  }

  getCategoriesName(): Observable<ApiResponse<string[]>>{
    const url = `${this.apiUrl}get-names`;
    return this.http.get<ApiResponse<string[]>>(url);
  }
}

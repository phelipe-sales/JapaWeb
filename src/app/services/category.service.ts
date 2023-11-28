import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CategoryResult } from '../types/category.interface';
import { ApiResponse, PagingResult } from '../types/apiResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `${environment.apiUrl}category/v1/`;
  router: any;

  constructor(private http: HttpClient) { }

  getAllCategories(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<CategoryResult>>> {
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<CategoryResult>>>(url);
  }
}

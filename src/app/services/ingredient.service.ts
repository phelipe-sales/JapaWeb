import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, PagingResult } from '../models/apiResponse';
import { IngredientResult } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl: string = `${environment.apiUrl}ingredient/v1/`;


  constructor(private http: HttpClient) { }

  getAllIngredients(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<IngredientResult>>>{
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<IngredientResult>>>(url);
  }
}
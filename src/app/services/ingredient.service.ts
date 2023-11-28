import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PagingResult } from '../types/apiResponse.interface';
import { IngredientResult } from '../types/ingredient.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl: string = `${environment.apiUrl}Ingredient/v1/`;


  constructor(private http: HttpClient) { }

  getAllIngredients(pageIndex: number, pageSize: number): Observable<ApiResponse<PagingResult<IngredientResult>>>{
    const url = `${this.apiUrl}get-all?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<PagingResult<IngredientResult>>>(url);
  }
}
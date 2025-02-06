import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICategory } from '../Interfaces/ICategory';
import { IEditCategory } from '../Interfaces/ICategory';
import { environment } from '../../../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.baseUrl}Categories`;
  constructor(private http: HttpClient) { } 
    getCategories(): Observable<ICategory[]> {
      return this.http.get<{ data: ICategory[] }>(`${this.apiUrl}/GetCategories`).pipe(
        map(response => response.data) 
      );
    }
    upsertCategory(category: IEditCategory): Observable<any> {
      return this.http.post(`${this.apiUrl}/UpsertCategory`, category);
    }

}

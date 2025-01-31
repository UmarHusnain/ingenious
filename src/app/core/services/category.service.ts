import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const categoryController = 'Categories/';
const categoryEndpoints = {
  getCategories: categoryController + 'GetCategories',
  upsertCategory: categoryController + 'UpsertCategory',
  deleteCategory: categoryController + 'DeleteCategory/{categoryId}',
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCategories(categoryId?: number): Observable<any> {
    let params = new HttpParams();
    if (categoryId)
      params = params.set('categoryId', categoryId.toString());

    const url = `${this.baseUrl}${categoryEndpoints.getCategories}`;
    return this.http.get(url, { params });
  }

  upsertCategory(categoryData: any): Observable<any> {
    const url = this.baseUrl + categoryEndpoints.upsertCategory;
    return this.http.post(url, categoryData);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url =
      this.baseUrl +
      categoryEndpoints.deleteCategory.replace('{categoryId}', categoryId.toString());
    return this.http.delete(url);
  }
}

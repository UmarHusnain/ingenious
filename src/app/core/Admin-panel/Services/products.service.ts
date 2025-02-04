import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../Interfaces/IProduct';
import { IAddProductRequest } from '../Interfaces/IAddProduct';
import { IUpdateProduct } from '../Interfaces/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl =` ${environment.baseApiUrl}${environment.ApiUrl}Products`;
  constructor(private http: HttpClient) { } 
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<{data:IProduct[]}>(`${this.apiUrl}/GetAllProducts`).pipe(
      map(response => response.data) );
  }
  
  addProduct(productRequest: IAddProductRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddCompleteProduct`, productRequest);
  }
  updateProduct(id: number, productData: IUpdateProduct): Observable<any> {
    const url = `${this.apiUrl}/UpdateProduct/${id}`;
    return this.http.put(url, productData);
  }
}

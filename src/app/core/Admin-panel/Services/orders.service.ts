import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IOrder } from '../Interfaces/IOrder';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl =` ${environment.baseApiUrl}${environment.ApiUrl}Orders`;
  constructor(private http: HttpClient) { } 
  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<{data:IOrder[]}>(`${this.apiUrl}/GetOrders`).pipe(
      map(response => response.data) );
  }
  addOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddOrder`, orderData);
  }

}

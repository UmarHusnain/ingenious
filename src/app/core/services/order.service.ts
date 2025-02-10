import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IOrder } from "../interfaces/IOrder";

const orderController = "Orders/";

const orderEndpoints = {
  getOrder: orderController + "GetOrders",
  addOrder: orderController + "AddOrder",
};

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get all reviews for a specific product
  getReviewsByProductId(
    orderId: number,
    aspNetUserId: string
  ): Observable<any> {
    const url =
      this.baseUrl +
      orderEndpoints.getOrder
        .replace("{orderId}", orderId.toString())
        .replace("{aspNetUserId}", aspNetUserId.toString());
    return this.http.get(url);
  }

    addOrder(OrderData: IOrder): Observable<any> {
      const url = this.baseUrl + orderEndpoints.addOrder;
      return this.http.post(url, OrderData);
    }
}

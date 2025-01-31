import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment.development";
import { Observable } from "rxjs";
import { ICreateCart, IUpdateCart } from "../interfaces/ICart";

const cartsController = "Carts/";
const cartEndpoints = {
  getCart: cartsController + "GetCart/{aspNetUserId}",
  addToCart: cartsController + "AddToCart",
  updateCartItem: cartsController + "UpdateCartItem",
  removeFromCart: cartsController + "RemoveFromCart/{cartId}/{aspNetUserId}",
  clearCart: cartsController + "ClearCart/{aspNetUserId}",
};

@Injectable({
  providedIn: "root",
})
export class CartService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCart(aspNetUserId: string): Observable<any> {
    const url =
      this.baseUrl +
      cartEndpoints.getCart.replace("{aspNetUserId}", aspNetUserId.toString());
    return this.http.get(url);
  }

  // Add a product to the cart
  addToCart(productData: ICreateCart): Observable<any> {
    const url = this.baseUrl + cartEndpoints.addToCart;
    return this.http.post(url, productData);
  }

  // Update a cart item
  updateCartItem(cartItemData: IUpdateCart): Observable<any> {
    const url = this.baseUrl + cartEndpoints.updateCartItem;
    return this.http.put(url, cartItemData);
  }

  // Delete a product from the cart by item ID
  deleteCartItem(cartId: number, aspNetUserId: string): Observable<any> {
    const url =
      this.baseUrl +
      cartEndpoints.removeFromCart
        .replace("{cartId}", cartId.toString())
        .replace("{aspNetUserId}", aspNetUserId.toString());
    return this.http.delete(url);
  }

  // Clear the cart for a specific user
  clearCart(aspNetUserId: string): Observable<any> {
    const url =
      this.baseUrl +
      cartEndpoints.clearCart.replace(
        "{aspNetUserId}",
        aspNetUserId.toString()
      );
    return this.http.delete(url);
  }
}

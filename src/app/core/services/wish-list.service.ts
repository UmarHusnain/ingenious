import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddWishlist } from '../interfaces/IWishList';

const wishlistController = "Wishlist/";
const wishlistEndpoints = {
  getWishlistByUserId: wishlistController + "GetWishlistByUserId/{aspNetUserId}",
  getWishlistById: wishlistController + "GetWishlistById/{wishlistId}",
  addToWishList: wishlistController + "AddToWishlist",
  removeFromWishList: wishlistController + "RemoveFromWishlist/{wishlistId}",
};

@Injectable({
  providedIn: 'root'
})
export class WishListService {

private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getWishlistByUserId(aspNetUserId: string): Observable<any> {
    const url =
      this.baseUrl +
      wishlistEndpoints.getWishlistByUserId.replace("{aspNetUserId}", aspNetUserId.toString());
    return this.http.get(url);
  }

  getWishlistById(wishlistId: number): Observable<any> {
    const url =
      this.baseUrl +
      wishlistEndpoints.getWishlistByUserId.replace("{aspNetUserId}", wishlistId.toString());
    return this.http.get(url);
  }

  // Add a product to the cart
  addToWishList(productData: IAddWishlist): Observable<any> {
    const url = this.baseUrl + wishlistEndpoints.addToWishList;
    return this.http.post(url, productData);
  }

  // Delete a product from the cart by item ID
  removeFromWishList(wishlistId: number): Observable<any> {
    const url = this.baseUrl + wishlistEndpoints.removeFromWishList.replace("{wishlistId}", wishlistId.toString());
    return this.http.delete(url);
  }
}

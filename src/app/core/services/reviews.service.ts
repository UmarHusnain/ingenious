import { Injectable } from '@angular/core';

const reviewsController = "Wishlist/";
const reviewsEndpoints = {
  getWishlistByUserId: reviewsController + "GetWishlistByUserId/{aspNetUserId}",
  getWishlistById: reviewsController + "GetWishlistById/{wishlistId}",
  addToWishList: reviewsController + "AddToWishlist",
  removeFromWishList: reviewsController + "RemoveFromWishlist/{wishlistId}",
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }
}

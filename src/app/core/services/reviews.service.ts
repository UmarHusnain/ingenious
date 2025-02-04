import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddReview } from '../interfaces/IReviews';

const reviewsController = "Reviews/";
const reviewsEndpoints = {
  getReviewsByProductId: reviewsController + "GetReviewsByProductId/{productId}",
  getReviewById: reviewsController + "GetReviewById/{reviewId}",
  addReview: reviewsController + "AddReview",
  updateReview: reviewsController + "UpdateReview",
  deleteReview: reviewsController + "DeleteReview/{reviewId}",
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get all reviews for a specific product
  getReviewsByProductId(productId: number): Observable<any> {
    const url = this.baseUrl + reviewsEndpoints.getReviewsByProductId.replace("{productId}", productId.toString());
    return this.http.get(url);
  }

  // Get a specific review by ID
  getReviewById(reviewId: number): Observable<any> {
    const url = this.baseUrl + reviewsEndpoints.getReviewById.replace("{reviewId}", reviewId.toString());
    return this.http.get(url);
  }

  // Add a new review
  addReview(reviewData: IAddReview): Observable<any> {
    const url = this.baseUrl + reviewsEndpoints.addReview;
    return this.http.post(url, reviewData);
  }

  // Update an existing review
  updateReview(reviewData: any): Observable<any> {
    const url = this.baseUrl + reviewsEndpoints.updateReview;
    return this.http.put(url, reviewData);
  }

  // Delete a review by ID
  deleteReview(reviewId: number): Observable<any> {
    const url = this.baseUrl + reviewsEndpoints.deleteReview.replace("{reviewId}", reviewId.toString());
    return this.http.delete(url);
  }
}

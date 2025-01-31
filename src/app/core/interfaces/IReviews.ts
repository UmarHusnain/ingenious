import { IGetProduct } from "./IProduct";

export interface IReview {
    reviewId: number;
    aspNetUserId: string;
    productId: number;
    rating: number;
    comment: string;
    createdAt: string;
}
 
export interface IGetReview {
    reviewId: number;
    aspNetUserId: string;
    productId: number;
    rating: number;
    comment: string;
    createdAt: string;
    product: IGetProduct;
}
 
export interface IAddReview {
    aspNetUserId: string;
    productId: number;
    rating: number;
    comment: string;
}
 
export interface IUpdateReview {
    reviewId: number;
    rating: number;
    comment: string;
}
import { IGetProduct } from "./IProduct";

export interface IWishlist {
    wishlistId: number;
    aspNetUserId: string;
    productId: number;
    createdAt: string;
}
 
export interface IGetWishlist {
    wishlistId: number;
    aspNetUserId: string;
    productId: number;
    createdAt: string;
    product: IGetProduct;
}
 
export interface IAddWishlist {
    aspNetUserId: string;
    productId: number;
}
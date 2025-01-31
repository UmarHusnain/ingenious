export interface IProductImage {
    imageId: number;
    productId: number;
    imageUrl: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}
 
export interface ICreateProductImage {
    productId: number;
    imageUrl: string;
    isDefault: boolean;
}
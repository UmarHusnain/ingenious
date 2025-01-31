export interface IProductVariation {
    variationId: number;
    productId: number;
    variationName: string;
    price: number | null;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
 
export interface ICreateProductVariation {
    productId: number;
    variationName: string;
    price: number | null;
    stock: number;
}
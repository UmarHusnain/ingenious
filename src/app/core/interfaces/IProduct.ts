import { ICategory } from "./ICategories";
import { ICreateProductImage, IProductImage } from "./IProductImage";
import { ICreateProductVariation, IProductVariation } from "./IProductVariation";

export interface ICreateProduct {
    categoryId: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
}
 
export interface IProductCreateCombined {
    product: ICreateProduct;
    images: ICreateProductImage[];
    variations: ICreateProductVariation[];
}
 
export interface IGetProduct {
    productId: number;
    categoryId: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    category: ICategory | null;
    productImages: IProductImage[] | null;
    productVariations: IProductVariation[] | null;
}
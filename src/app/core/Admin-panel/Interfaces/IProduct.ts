import { ICategory } from "./ICategory";
export interface ProductVariation {
    variationId: number;
    productId:number;
    variationName: string;
    price: number;
    stock: number;
    isActive:boolean;
    createdAt:string;
    updatedAt:string
  }
  
  export interface ProductImage {
    imageId: number;
    productId:number;
    imageUrl: string;
    isDefault:boolean;
    createdAt:string;
    updatedAt:string;
  }
  
  export interface IProduct {
    productId: number;
    categoryId:number;
    name: string;
    slug:string;
    description: string;
    price: number;
    discount:number;
    stock:number;
    createdAt:string;
    updatedAt:string;
    category: ICategory;
    productVariations: ProductVariation[];
    productImages: ProductImage[];
    isActive:boolean,
  }
  export interface IUpdateProduct {
    categoryId: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
  }
  
export interface Product {
    categoryId: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
  }
  
  export interface Image {
    productId: number;
    imageUrl: string;
    isDefault: boolean;
  }
  
  export interface Variation {
    productId: number;
    variationName: string;
    price: number;
    stock: number;
  }
  
  export interface IAddProductRequest {
    product: Product;
    images: Image[];
    variations: Variation[];
  }
  
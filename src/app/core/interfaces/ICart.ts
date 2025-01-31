export interface ICart {
  cartId: number;
  aspNetUserId: string;
  productId: number;
  variationId: any;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  productName: string;
  variationName: any;
  productImageUrl: string;
}

export interface ICreateCart {
  aspNetUserId: string;
  productId: number;
  variationId: number;
  quantity: number;
  price: number;
}

export interface IUpdateCart {
  cartId: number;
  aspNetUserId: string;
  productId: number;
  variationId: number;
  quantity: number;
  price: number;
}

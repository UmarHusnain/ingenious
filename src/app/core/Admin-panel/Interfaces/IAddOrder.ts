// order.model.ts
export interface OrderItem {
    productId: number;
    variationId: number;
    quantity: number;
    price: number;
  }
  
  export interface IAddOrder {
    aspNetUserId: string;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    shippingAddressId: number;
    orderItems: OrderItem[];
  }
  
export interface OrderItem {
    orderItemId: number;
    orderId: number;
    productId: number;
    variationId: number;
    quantity: number;
    price: number;
  }
  
  export interface IOrder {
    orderId: number;
    aspNetUserId: string;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    shippingAddressId: number;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
  }
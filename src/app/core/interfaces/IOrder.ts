export interface IOrder {
    aspNetUserId: string
    totalAmount: number
    orderStatus: string
    paymentStatus: string
    shippingAddressId: number
    orderItems: IOrderItem[]
  }
  
  export interface IOrderItem {
    orderId: number
    productId: number
    variationId: number
    quantity: number
    price: number
  }
  
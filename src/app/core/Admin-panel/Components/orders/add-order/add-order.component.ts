import { Component } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { IAddOrder, OrderItem } from '../../../Interfaces/IAddOrder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../services/product.service';
import { IProduct, ProductVariation } from '../../../Interfaces/IProduct';
import { AuthService } from '../../../../auth/Services/auth.service';
import { LocalStorageService } from '../../../../auth/Services/localStorage.service';
@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
  providers:[AuthService,LocalStorageService]
})
export class AddOrderComponent {
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;
  isLoading: boolean = false;
  subtotal:any=0
  
  order: IAddOrder = {
    aspNetUserId: '',
    totalAmount: 0,
    orderStatus: 'pending',
    paymentStatus: 'pending',
    shippingAddressId: 0,
    orderItems: []
  };
  aspNetUserId:any
  variations: ProductVariation[] = [];
   newItem: OrderItem = { productId: 0, variationId: 0, quantity: 1, price: 0 };
  products :IProduct []=[]; // Populate with product data
   // Populate with variation data
  orderItems: any[] = [];
  newOrder: any = {
    aspNetUserId: '',
    totalAmount: 0,
    price:0,
    discount:0,
    quantity:0,
    orderStatus: 'pending',
    paymentStatus: 'pending',
    shippingAddressId: 9,
    orderItems: this.orderItems
  };
  selectedProduct:any
  constructor(private orderService: OrdersService,private activeModal: NgbActiveModal, private productService:ProductService, private authService:AuthService) {}
  ngOnInit(){
this.fetchProducts()
this.aspNetUserId=this.authService.getAspNetUserId()
}
fetchProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (data) => {
      this.products = data.data;
      console.log('Products fetched:', this.products);
    },
    error: (err) => console.error('Error fetching products:', err)
  });
}
onProductSelect(productId: number): void {
  console.log(productId)
   this.selectedProduct = this.products.find(p => p.productId == productId);
  console.log(this.selectedProduct)
  if (this.selectedProduct) {
    this.variations = this.selectedProduct.productVariations;
    //console.log(this.variations)
   // this.newOrder.price=this.variations.price

  }
}
OnVariationChange(variationId:number){
  const selectedVariation = this.selectedProduct.productVariations.find((v: { variationId: number; }) => v.variationId === variationId);
  if (selectedVariation) {
    this.newOrder.price = selectedVariation.price;
    this.newOrder.discount=this.selectedProduct.discount
  }
  else{
    this.newOrder.price=this.selectedProduct.price
    this.newOrder.discount=this.selectedProduct.discount
  }
}
addOrderItem(): void {
  if (!this.newOrder.productId) {
    this.showAlertMessage('Please select a product.', 'error');
    return;
  }
  if (this.newOrder.quantity <= 0) {
    this.showAlertMessage('Quantity must be greater than zero.', 'error');
    return;
  }
  const existingItem = this.orderItems.find(item => item.productId == this.newOrder.productId && item.variationId == this.newOrder.variationId);
  
  if (existingItem) {
    this.newOrder.totalAmount=this.newOrder.totalAmount-existingItem.subtotal
    // If the item exists, update the quantity
    existingItem.quantity += this.newOrder.quantity;
    existingItem.subtotal = this.calculateSubtotal(existingItem)
    this.calculateTotalAmount(existingItem)
  } else {
    // If the item doesn't exist, add it to the orderItems array
    const newItem = {
      productId: this.newOrder.productId,
      variationId: this.newOrder.variationId,
      quantity: this.newOrder.quantity,
      price: this.newOrder.price,
      subtotal:this.calculateSubtotal(this.newOrder)
    
    };
    this.orderItems.push(newItem);
    this.calculateTotalAmount(newItem);
    this.newOrder.productId=''
    this.newOrder.variationId=''
    this.newOrder.quantity=0
    this.newOrder.price=0
    this.newOrder.discount=0

  }
 //this.calculateSubtotal();
 // this.calculateTotalAmount();

}
calculateSubtotal(item: any): number {
  return (item.price * item.quantity) - ((this.selectedProduct.discount/100) *(item.price * item.quantity));
}
// calculateSubtotal(){
//   this.orderItems.reduce((total, item) => {
//     const itemPrice = item.price || 0;
//     const itemDiscount = this.selectedProduct.discount || 0;
//     const itemQuantity = item.quantity || 0;
//     const discountedPrice = itemPrice - (itemPrice * (itemDiscount / 100));
//     return  (discountedPrice * itemQuantity);
//   }, 0); 
// }
calculateTotalAmount(newitem:any): void {
 // const discountAmount = (this.selectedProduct.discount / 100) * item.price
 console.log(this.orderItems.reduce((total, item)=>console.log(item.price)))
 this.newOrder.totalAmount =this.newOrder.totalAmount+newitem.subtotal
 // this.newOrder.totalAmount = this.orderItems.reduce((total, item) => total + (item.price-((this.selectedProduct.discount / 100) * (item.price * item.quantity))), 0);
}

removeOrderItem(index: number,subtotal:number): void {
  if (index >= 0 && index < this.orderItems.length) {
    this.orderItems.splice(index, 1);
   // console.log(this.orderItems)
   console.log(this.newOrder.totalAmount)
    this.newOrder.totalAmount= this.newOrder.totalAmount-subtotal
  } else {
    this.showAlertMessage('Invalid item index.', 'error');
  }
}

  getProductNameById(productId: number): string {
    const product = this.products.find(p => p.productId == productId);
    return product ? product.name : 'Unknown Product';
  }
  
  getVariationNameById(variationId: number): string {
    const variation = this.variations.find(v => v.variationId == variationId);
    return variation ? variation.variationName : 'Unknown Variation';
  }
  

  onSubmit(): void {
    if (this.orderItems.length==0){
      if (!this.newOrder.productId || this.newOrder.quantity <= 0) {
        this.showAlertMessage('Please select a product and set a valid quantity.', 'error');
        return;
      }
      else{
        this.addOrderItem()
        const orderData = {
          aspNetUserId: this.aspNetUserId,
          totalAmount: this.newOrder.totalAmount,
          orderStatus: 'pending',
          paymentStatus: 'pending',
          shippingAddressId: this.newOrder.shippingAddressId,
          orderItems: this.orderItems.map((item) => ({
            orderId: 0, // Assuming 0 for new orders
            productId: item.productId,
            variationId: item.variationId,
            quantity: item.quantity,
            price: item.subtotal,
          })),
        };
        this.orderService.addOrder(orderData).subscribe(
          (response) => {
          console.log(response)
          },
          (error) => {
           console.log(error)
          }
        );
      }
    }
else
{
    const orderData = {
      aspNetUserId: this.newOrder.aspNetUserId,
      totalAmount: this.newOrder.totalAmount,
      orderStatus: 'pending',
      paymentStatus: 'pending',
      shippingAddressId: this.newOrder.shippingAddressId,
      orderItems: this.orderItems.map((item) => ({
        orderId: 0, // Assuming 0 for new orders
        productId: item.productId,
        variationId: item.variationId,
        quantity: item.quantity,
        price: item.subtotal,
      })),
    };
    this.orderService.addOrder(orderData).subscribe(
      (response) => {
      console.log(response)
      },
      (error) => {
       console.log(error)
      }
    );
}
   
  }
  
  showAlertMessage(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.closePopupMsg();
    }, 5000);
  }
  closePopupMsg() {
    this.showAlert = false;
  }
  closeModal() {
    this.activeModal.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { OrderService } from '../../../services/order.service';
import { ICart } from '../../../interfaces/ICart';
import { IOrder, IOrderItem } from '../../../interfaces/IOrder';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IAddress } from '../../../auth/Interfaces/IRegister';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/Services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  loginedUser: any;
  cartItems: ICart[] = [];
  subtotal: number = 0;
  total: number = 0;
  isDefaultChecked: boolean = false;
  checkoutData: IAddress = {
    aspNetUserId: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  };

  constructor(
    private sharedService: SharedService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}
  

  ngOnInit(): void {
    // Retrieve user address from local storage
    this.loginedUser = this.authService.getAuthTokenWithLoginData();
     // If user is logged in, pre-fill address fields
     if (this.loginedUser && this.loginedUser.street) {
      this.isDefaultChecked = true; // Auto-check "Use my saved address"
      this.populateAddressFromLocalStorage();
    }
    // if (this.loginedUser) {
    //   this.checkoutData.aspNetUserId = this.loginedUser.aspNetUserId || '';
    // }

    // Subscribe to cart items
    this.sharedService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    // Subscribe to subtotal and total
    this.sharedService.subtotal$.subscribe((subtotal) => {
      this.subtotal = subtotal;
    });

    this.sharedService.total$.subscribe((total) => {
      this.total = total;
    });
  }

  populateAddressFromLocalStorage(): void {
    this.checkoutData = {
      aspNetUserId: this.loginedUser.aspNetUserId || '',
      street: this.loginedUser.street || '',
      city: this.loginedUser.city || '',
      state: this.loginedUser.state || '',
      postalCode: this.loginedUser.postalCode || '',
      country: this.loginedUser.country || '',
      isDefault: true
    };
  }

  /**
   * Handle "Is Default" checkbox change
   */
  toggleDefaultAddress(): void {
    if (this.isDefaultChecked) {
      this.populateAddressFromLocalStorage();
    } else {
      this.checkoutData = {
        aspNetUserId: this.loginedUser?.aspNetUserId || '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false
      };
    }
  }

  /**
   * Place Order API Call
   */
  placeOrder(): void {
    if (!this.checkoutData.street || !this.checkoutData.city || !this.checkoutData.state || !this.checkoutData.postalCode || !this.checkoutData.country) {
      alert('Please fill in all required address fields.');
      return;
    }
  
    const orderItems: IOrderItem[] = this.cartItems.map(item => ({
      orderId: 0,
      productId: item.productId,
      variationId: 0,
      quantity: item.quantity,
      price: item.price
    }));
  
    const orderData: IOrder = {
      aspNetUserId: this.checkoutData.aspNetUserId,
      totalAmount: this.total,
      orderStatus: 'Pending',
      paymentStatus: 'Unpaid',
      shippingAddressId: 0, 
      orderItems: orderItems
    };
  
    // Simulating API Response
    const mockApiResponse = {
      message: 'Order placed successfully!',
      data: orderData
    };
  
    // Displaying the mock response in console
    console.log('Simulated API Response:', mockApiResponse);
  
    // Simulating successful navigation after placing the order
    alert(mockApiResponse.message);
    this.router.navigate(['/order-success']);
  }
  
}

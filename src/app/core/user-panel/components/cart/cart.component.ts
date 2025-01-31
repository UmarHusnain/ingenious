import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, effect, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../shared/services/shared.service';
import { addCart, cartSignal } from '../../../../../../store/cartStore';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  aspNetUserId: string = '9653ee76-abb5-40c7-9ebd-b16ba4af6662'; 
  isLoading: boolean = false;

  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;


  modalOptions: NgbModalOptions = {
    backdrop: false,
    keyboard: false,
    // size: 'md',
  };
  constructor(private cartService: CartService,
    private router: Router,
    private modalService: NgbModal,
  private sharedService: SharedService
  ) {
    effect(() => {
          this.cartItems = cartSignal();
        });
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;

    this.cartService.getCart(this.aspNetUserId).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.cartItems = response.data; 
          addCart(this.cartItems);
        } else {
          this.cartItems = []; // If no items found, reset the cart
        }
        this.calculateTotal();
        this.isLoading = false;
      },
      (error) => console.error('Error loading cart:', error)
    );
  }
  

  calculateTotal() {
    if (!Array.isArray(this.cartItems)) {
      console.error('cartItems is not an array:', this.cartItems);
      return;
    }
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  changeQuantity(item: any, change: number) {
    const newQuantity = item.quantity + change;
  
    if (newQuantity < 1) return; // Prevent negative quantity
  
    item.quantity = newQuantity;
    this.updateCartItem(item); // Call API to update quantity
    addCart(this.cartItems); // Update store
    this.calculateTotal(); // Recalculate total price
  }
  
  updateCartItem(item: any) {
    const cartItemData = {
      cartId: item.cartId,
      aspNetUserId: this.aspNetUserId,
      productId: item.productId,
      variationId: item.variationId,
      quantity: item.quantity,
      price: item.price
    };
  
    this.cartService.updateCartItem(cartItemData).subscribe({
      next: (response) => {
        console.log('Cart updated:', response);
        addCart(this.cartItems);
        this.showAlertMessage('Cart updated successfully!', 'success');
      },
      error: (err) => {
        console.error('Failed to update cart:', err);
        this.showAlertMessage('Failed to update cart. Try again!', 'error');
      }
    });
  }

  openConfirmationModel(content: any, cartId: number, aspNetUserId: string) {
    this.modalService.open(content, this.modalOptions).result.then(
      (result: string) => {
        if (result === 'yes') {
          this.isLoading = true;
          this.removeItem(cartId, aspNetUserId);
        }
      },
      (reason: any) => {
      }
    );
  }

  removeItem(cartId: number, aspNetUserId: string): void {
    this.cartService.deleteCartItem(cartId, aspNetUserId).subscribe({
      next: (response: any) => {
        console.log('deleteCartItem Response:', response);
        if (response && Array.isArray(response.data)) {
          this.cartItems = response.data;
          addCart(this.cartItems);
        } else {
          console.error('Expected an array in response.data, received:', response.data);
          this.cartItems = [];
        }
        this.calculateTotal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to delete cart item:', err);
        this.isLoading = false;
      },
    });
  }


  proceedToCheckout(): void {
    this.sharedService.setCartItems(this.cartItems); // Set the cart data in the shared service
    this.router.navigate(['/pharmacy/checkout']);
  }


  clearCart() {
    this.cartService.clearCart(this.aspNetUserId).subscribe(() => {
      this.cartItems = [];
      this.totalAmount = 0;
    });
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

}

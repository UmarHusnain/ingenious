import { CommonModule } from '@angular/common';
import { Component, effect, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { addCart, cartSignal } from '../../../../../store/cartStore';
import { NgbModule, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class HeaderComponent {
  isSticky = false;
  aspNetUserId: string = '9653ee76-abb5-40c7-9ebd-b16ba4af6662'; 
  cartItems: any[] = [];
  totalAmount: number = 0;
  cartCount: number = 0;
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
    private modalService: NgbModal,
    private sharedService: SharedService,
    private router: Router,

  ) 
  {
    effect(() => {
      this.cartItems = cartSignal();
      this.calculateTotal(); 
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.aspNetUserId).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.cartItems = response.data;
          this.cartCount = this.cartItems.length;
          addCart(this.cartItems)
        } else {
          this.cartItems = [];
          this.cartCount = 0;
        }
        this.calculateTotal();

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


  updateCartItem(item: any, quantity: number) {
    if (quantity < 1) return; 
    item.quantity = quantity; 
    addCart(this.cartItems);

    this.calculateTotal();
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 100; // Set threshold for stickiness
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

  proceedToCheckout(): void {
    this.sharedService.setCartItems(this.cartItems); // Set the cart data in the shared service
    this.router.navigate(['/checkout']);
  }

     // Check if the current route matches the given path
     isActive(route: string): boolean {
      const currentUrl = this.router.url;
      
      // Ensure home is only active when exactly on "/"
      if (route === '/' && currentUrl !== '/') {
        return false;
      }
    
      // Check if the current URL starts with the route
      return currentUrl === route || currentUrl.startsWith(route + '/');
    }
    
}

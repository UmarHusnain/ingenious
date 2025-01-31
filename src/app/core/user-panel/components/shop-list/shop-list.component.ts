import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from "../../../../shared/components/breadcrumbs/breadcrumbs.component";
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ICategory } from '../../../interfaces/ICategories';
import { IGetProduct } from '../../../interfaces/IProduct';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../../services/wish-list.service';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [RouterModule, BreadcrumbsComponent,CommonModule],
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  categories: ICategory[] = [];
  products: IGetProduct[] = [];
  isLoading: boolean = false;
  aspNetUserId: string = '9653ee76-abb5-40c7-9ebd-b16ba4af6662';
  wishlist: { [key: number]: number } = {};

  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private wishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.loadWishlist();

  }

  // Fetch categories from the service
  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
        this.isLoading = false;
      },
    });
  }

  // Fetch products from the service
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load products:', error);
        this.isLoading = false;
      },
    });
  }

loadWishlist(): void {
  this.wishlistService.getWishlistByUserId(this.aspNetUserId).subscribe({
    next: (response) => {
      if (response.success && Array.isArray(response.data)) {
        this.wishlist = {}; // Reset before loading
        response.data.forEach((wishlistItem: any) => {
          if (wishlistItem.productId && wishlistItem.wishlistId) {
            this.wishlist[wishlistItem.productId] = wishlistItem.wishlistId;
          }
        });
      }
    },
    error: (err) => console.error('Failed to load wishlist:', err)
  });
}


  goToProductDetail(product: IGetProduct): void {
    this.router.navigate(['/product-detail'], { state: { product } });
  }
  
  toggleWishlist(product: IGetProduct): void {
    if (!this.wishlist[product.productId]) {
      // Add to Wishlist
      const wishlistItem = {
        aspNetUserId: this.aspNetUserId,
        productId: product.productId
      };
  
      this.wishlistService.addToWishList(wishlistItem).subscribe({
        next: (response) => {
          console.log('wishlist added:', response);
          this.showAlertMessage('Wishlist Added successfully!', 'success');
        },
        error: (err) => {
          console.error('Failed to added wishlist:', err);
          this.showAlertMessage('Failed to added wishlist. Try again!', 'error');
        }        
      });
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

}


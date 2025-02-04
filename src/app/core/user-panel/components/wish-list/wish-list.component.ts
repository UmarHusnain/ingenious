import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CategoryService } from "../../../services/category.service";
import { ProductService } from "../../../services/product.service";
import { ICategory } from "../../../interfaces/ICategories";
import { IGetProduct } from "../../../interfaces/IProduct";
import { CommonModule } from "@angular/common";
import { WishListService } from "../../../services/wish-list.service";
import { BreadcrumbsComponent } from "../../../../shared/components/breadcrumbs/breadcrumbs.component";
import { IGetWishlist } from "../../../interfaces/IWishList";

@Component({
  selector: "app-wish-list",
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbsComponent],
  templateUrl: "./wish-list.component.html",
  styleUrl: "./wish-list.component.scss",
})
export class WishListComponent implements OnInit {
  categories: ICategory[] = [];
  wishListProduct: IGetWishlist[] = [];
  isLoading: boolean = false;
  aspNetUserId: string = "9653ee76-abb5-40c7-9ebd-b16ba4af6662";
  wishlist: { [key: number]: number } = {};

  alertType: "success" | "error" = "success";
  alertMessage: string = "";
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private wishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
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
        console.error("Failed to load categories:", error);
        this.isLoading = false;
      },
    });
  }

  // Fetch products from the service

  loadWishlist(): void {
    this.wishlistService.getWishlistByUserId(this.aspNetUserId).subscribe({
      next: (response) => {
        this.wishListProduct = response.data;
        console.log(this.wishlist, "wishlist");
      },
      error: (err) => console.error("Failed to load wishlist:", err),
    });
  }

  // goToProductDetail(wishlistId: IGetProduct): void {
  //   this.router.navigate(['/product-detail'], { state: { product } });
  // }

  showAlertMessage(message: string, type: "success" | "error"): void {
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

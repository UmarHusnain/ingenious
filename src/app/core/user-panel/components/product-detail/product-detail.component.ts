import { Component } from "@angular/core";
import { ICategory } from "../../../interfaces/ICategories";
import { CategoryService } from "../../../services/category.service";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { CartService } from "../../../services/cart.service";
import { FormsModule } from "@angular/forms";
import { addCart } from "../../../../../../store/cartStore";
import { ICart, ICreateCart } from "../../../interfaces/ICart";
import { IAddReview, IReview } from "../../../interfaces/IReviews";
import { ReviewsService } from "../../../services/reviews.service";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.scss",
})
export class ProductDetailComponent {
  categories: ICategory[] = [];
  isLoading: boolean = false;
  product: any;
  selectedVariation: any = null;
  quantity: number = 1;
  aspNetUserId: string = "9653ee76-abb5-40c7-9ebd-b16ba4af6662";

  activeTab: string = "prod-reviews";
  cartItems: ICart[] = [];
  reviews: IReview[] = []; // Store product reviews
  newReview: IAddReview = {
    aspNetUserId: this.aspNetUserId,
    productId: 0,
    rating: 0, // Default: No stars selected
    comment: "",
  };

  alertType: "success" | "error" = "success";
  alertMessage: string = "";
  showAlert: boolean = false;

  rating: number = 0; // Current rating
  hoverRating: number = 0; // Temporary rating during hover

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private cartService: CartService,
    private reviewsService: ReviewsService
  ) {
    const navigation = history.state;
    if (navigation && navigation.product) {
      this.product = navigation.product;
      this.newReview.productId = this.product.productId;
    } else {
      console.error("not found product detail");
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    if (!this.product) {
      this.router.navigate(["/shop"]);
    }

    this.loadReviews();
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

  loadReviews(): void {
    this.reviewsService
      .getReviewsByProductId(this.product.productId)
      .subscribe({
        next: (response) => {
          console.log("review result: ", response);
          this.reviews = response.data || [];
        },
        error: (error) => {
          console.error("Failed to load reviews:", error);
        },
      });
  }

  submitReview(): void {
    if (!this.newReview.comment.trim()) {
      alert("Review comment cannot be empty!");
      return;
    }

    console.log("Submitting review:", this.newReview); // Debugging log

    this.reviewsService.addReview(this.newReview).subscribe({
      next: (response) => {
        if (response.success) {
          alert("Review added successfully!");
          this.newReview.comment = ""; // Clear comment
          this.newReview.rating = 0; // Reset rating
          this.loadReviews(); // Refresh reviews
        } else {
          console.error("API Response Error:", response.message);
          alert("Failed to add review: " + response.message);
        }
      },
      error: (error) => {
        console.error("Failed to add review:", error);
        alert("Failed to add review. Try again!");
      },
    });
  }

  setRating(value: number): void {
    this.rating = value;
  }

  // Set the hover rating when the mouse is over a star
  setHover(value: number): void {
    this.hoverRating = value;
  }

  // Reset the hover rating when the mouse leaves the stars
  resetHover(): void {
    this.hoverRating = 0;
  }

  selectVariation(variation: any): void {
    this.selectedVariation = variation; // Update selected variation
    this.product.price = variation.price; // Update displayed price
  }

  addToCart(): void {
    if (!this.product) return;

    const cartItem: ICreateCart = {
      aspNetUserId: this.aspNetUserId,
      productId: this.product.productId,
      variationId: this.selectedVariation
        ? this.selectedVariation.variationId
        : null,
      quantity: this.quantity,
      price: this.product.price,
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        this.cartItems = response.data || [];
        addCart(this.cartItems);
        this.showAlertMessage("Product added to cart successfully!", "success");
      },
      error: (err) => {
        console.error("Failed to add product to cart:", err);
        this.showAlertMessage(
          "Failed to add product to cart. Please try again.",
          "error"
        );
      },
    });
  }
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
  changeQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }
  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}

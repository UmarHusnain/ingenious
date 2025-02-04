import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../Services/products.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../Interfaces/IProduct';
import { CategoriesService } from '../../../Services/categories.service';
import { ICategory } from '../../../Interfaces/ICategory';
import { IUpdateProduct } from '../../../Interfaces/IProduct';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  @Input() product: any; // Receive product data from parent
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;
  productForm!: FormGroup;
  previewImages: string[] = [];
  isLoading: boolean=false;
    categories: ICategory[]=[];
  constructor(private fb: FormBuilder, private productService: ProductsService,private activeModal: NgbActiveModal,private categoryService:CategoriesService) {}

  ngOnInit() {
    // Initialize the form
    this.fetchCategories();
    this.productForm = this.fb.group({
      name: [this.product?.name || ''],
      stock: [this.product?.stock || ''],
      price: [this.product?.price || ''],
      discount: [this.product?.discount || 0],
      description: [this.product?.description || ''],
      categoryId: [this.product?.categoryId || '']
    })

    // Pre-fill form with product data
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        stock: this.product.stock,
        price: this.product.price,
        discount: this.product.discount || 0,
        description: this.product.description,
      });

      // Load images
  //    this.previewImages = this.product.productImages || [];
    }
  }
  closeModal() {
    this.activeModal.close();

  }
  fetchCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories)
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.showAlertMessage('Failed to fetch categories', 'error');
        this.isLoading = false;
      }
    });
  }
  setDefaultImage(index: number): void {
    if (this.product && this.product.productImages) {
      // Reset all images to non-default
      this.product.productImages.forEach((image: any) => {
        image.isDefault = false;
      });

      // Set the selected image as default
      this.product.productImages[index].isDefault = true;
    }
  }
  submitForm(){
    if (this.productForm.invalid || !this.product?.productId) return;

    this.isLoading = true;
    const updatedProduct: IUpdateProduct = {
      name:this.product.name,
      categoryId:this.product.categoryId,
      description:this.product.description,
      price:this.product.price,
      discount:this.product.discount,
      stock:this.product.stock,
      slug: this.product.name.toLowerCase().replace(/\s+/g, '-') // Keep existing slug
    };

    this.productService.updateProduct(this.product.productId, updatedProduct).subscribe({
      next: () => {
        this.showAlertMessage('Product updated successfully','success');
        this.isLoading = false;
        this.activeModal.close(true);
      },
      error: (error) => {
        this.showAlertMessage('Error updating product', 'error');
        this.isLoading = false;
      }
    });  
  }
  triggerFileInput() {
    const fileInput = document.getElementById('productImages') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle Image Selection
  onImageSelect(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && this.product) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.product?.productImages.push({
            imageId:0,
            productId:this.product.productId,
            imageUrl: e.target.result, 
            isDefault: true,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()

          });
        };

        reader.readAsDataURL(file);
      });
    }
  }
  removeImage(index: number) {
    if (this.product) {
      this.product.productImages.splice(index, 1);
    }
  }
  addVariation() {
    if (!this.product) return;
    
    if (!this.product.productVariations) {
      this.product.productVariations = []; // Initialize if null
    }

    this.product.productVariations.push({
      variationId: 0, 
      productId: this.product.productId,
      variationName: '',
      price: 0,
      stock: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  // Remove variation
  removeVariation(index: number) {
    if (this.product) {
      this.product.productVariations.splice(index, 1);
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

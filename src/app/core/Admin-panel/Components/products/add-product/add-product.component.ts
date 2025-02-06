import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../../Services/categories.service';
import { ICategory } from '../../../Interfaces/ICategory';
import { ProductImage } from '../../../Interfaces/IProduct';
import { ProductsService } from '../../../Services/products.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;
  isLoading: boolean = false;
  previewImages: ProductImage[] = [];
  productForm!: FormGroup;
  categories: ICategory[]=[];
  constructor(private fb: FormBuilder,   private activeModal: NgbActiveModal, private categoryService:CategoriesService, private productService:ProductsService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      description: [''],
      productImages: this.fb.array([]),
      productVariations: this.fb.array([ this.createVariationFormGroup() ]),
      categoryId: ['', Validators.required],
    });
    this.fetchCategories();
  }
  setDefaultImage(index: number): void {
    this.previewImages.forEach((img, i) => img.isDefault = i === index);
    console.log(this.previewImages);
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
  // Product Variations
  get productVariations(): FormArray {
    return this.productForm.get('productVariations') as FormArray;
  }
  createVariationFormGroup(): FormGroup {
    return this.fb.group({
      variationName: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
  }
  addVariation() {
    this.productVariations.push(
      this.fb.group({
        variationName: ['', Validators.required],
        price: [0, Validators.required],
        stock: [0, Validators.required]
      })
    );
  }
  onAddVariation(index: number): void {
    const currentVariation = this.productVariations.at(index);
    if (currentVariation.valid) {
      // Variation is valid so add a new empty variation at the end.
      this.productVariations.push(this.createVariationFormGroup());
    } else {
      // Mark controls as touched to trigger validation messages
      currentVariation.markAllAsTouched();
    }
  }
  // removeVariation(index: number) {
  //   this.productVariations.removeAt(index);
  // }
  removeVariation(index: number): void {
    // Ensure that we always have at least one row (the empty row)
    if (this.productVariations.length > 1) {
      this.productVariations.removeAt(index);
    }
  }

  //Product Images
  get productImages(): FormArray {
    return this.productForm.get('productImages') as FormArray;
  }

  // addImage(imageUrl: string) {
  //   this.productImages.push(this.fb.group({ imageUrl: [imageUrl, Validators.required] }));
  // }

  // removeImage(index: number) {
  //   this.productImages.removeAt(index);
  // }
  // Open file selector when clicking on the upload area
  triggerFileInput() {
    const fileInput = document.getElementById('productImages') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle Image Selection
  onImageSelect(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const imageName = file.name
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageControl = this.fb.group({
            productId:0,
            imageUrl: [imageName, Validators.required],
            isDefault: [false],
          });
          this.productImages.push(imageControl);
          this.previewImages.push({
            imageId:0,
            productId:0,
            imageUrl: e.target.result, 
            isDefault: false,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()

          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Remove Selected Image
  removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }
  // Submit Form
  submitForm() {
    console.log(this.productForm)
    
    console.log(this.previewImages)
    const validVariations = this.productVariations.controls.filter(variation => {
      const name = variation.get('variationName')?.value;
      const price = variation.get('price')?.value;
      const stock = variation.get('stock')?.value;
      return name && price > 0 && stock > 0;
    });
  
    // Update the productVariations FormArray with valid variations
    this.productVariations.clear();
    validVariations.forEach(variation => {
      this.productVariations.push(variation);
    });
    if (this.productForm.valid) {
      this.isLoading=false;
      const productData = {
        product: {
          categoryId: parseInt(this.productForm.value.categoryId),
          name: this.productForm.value.name,
          slug: this.productForm.value.name.toLowerCase().replace(/\s+/g, '-'),
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          discount: this.productForm.value.discount,
          stock: this.productForm.value.stock
        },
        images: this.productForm.value.productImages.map((img: { imageUrl: any; isDefault: any; }) => ({
          productId: 0, // Placeholder
          imageUrl: img.imageUrl,
          isDefault: img.isDefault
        })),
        variations: this.productForm.value.productVariations.map((variation: any) => ({
          productId: 0, // Placeholder
          variationName: variation.variationName,
          price: variation.price,
          stock: variation.stock
        }))
      };
  
      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showAlertMessage('Product added successfully!', 'success');
          this.closeModal();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error adding product:', error);
          this.showAlertMessage('Failed to add product', 'error');
        }
      });
    }
    else {
      this.showAlertMessage('Please fill all required fields', 'error');
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

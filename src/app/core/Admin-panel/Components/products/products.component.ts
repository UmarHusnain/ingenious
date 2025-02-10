import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { IProduct } from '../../Interfaces/IProduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: IProduct[] = [];
  modalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: false,
      keyboard: false,
    };
    isLoading: boolean = false;
    alertMessage: string = '';
    alertType: 'success' | 'error' = 'success';
    showAlert: boolean = false;
    deleteModalOptions: NgbModalOptions = {
      backdrop: false,
      keyboard: false
    };
constructor(private productService:ProductsService,private modalService: NgbModal){}
ngOnInit(): void {
  this.fetchProducts();
}
fetchProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (data) => {
      this.products = data;
      console.log('Products fetched:', this.products);
    },
    error: (err) => console.error('Error fetching products:', err)
  });
}
navigateToAddProduct(){
  const modalRef = this.modalService.open(
    AddProductComponent,
    this.modalOptions
  );

  modalRef.result.then(
    (result) => {
        this.showAlertMessage('Product purchased successfully.', 'success');
        this.fetchProducts();
    },
    (reason) => {
      // Handle modal closing without selection
    }
  );
}
  toggleStatus(product: IProduct): void {
    product.isActive = !product.isActive; 
  }
  openViewProductModal(product:any){
    const modalRef = this.modalService.open(
      ProductDetailsComponent,
      this.modalOptions
    );
    modalRef.componentInstance.product = product;
  }
  openEditProductModal(product:any){
    const modalRef = this.modalService.open(
      EditProductComponent,
      this.modalOptions
    );
    modalRef.componentInstance.product = product;
    modalRef.result.then(
      (result) => {
        this.showAlertMessage("product updated successfully",'success')
     console.log("success")
      },
      (reason) => {
        this.showAlertMessage("product is not updated successfully",'error')
      }
    );
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

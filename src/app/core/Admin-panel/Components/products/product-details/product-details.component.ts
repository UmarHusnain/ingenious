import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
@Input() product:any
currentImageIndex: number = 0;
currentImage: any;
//dtOptions: DataTables.Settings = {};
constructor(private activeModal: NgbActiveModal){

}
ngOnInit(): void {
  this.updateCurrentImage();
  // this.dtOptions = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   processing: true
  // };
  // $(document).ready(function() {
  //   $('#variationsTable').DataTable();
  // });
}
toggleVariationStatus(variation: any) {
  // Handle variation status change
  console.log(`Variation ${variation.variationName} is now ${variation.isActive ? 'Active' : 'Inactive'}`);
}
updateCurrentImage(): void {
  if (this.product?.productImages?.length) {
    this.currentImage = this.product.productImages[this.currentImageIndex];
  }
}

prevImage(): void {
  if (this.product?.productImages?.length) {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.productImages.length) % this.product.productImages.length;
    this.updateCurrentImage();
  }
}

nextImage(): void {
  if (this.product?.productImages?.length) {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.productImages.length;
    this.updateCurrentImage();
  }
}
closeModal() {
  this.activeModal.close();

}
}

import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '../../../Interfaces/IProduct';
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
   @Input() order:any;
   products:IProduct[]=[]
  constructor(  private activeModal: NgbActiveModal, private productService:ProductService) {}
   

  ngOnInit(): void { 
   this.fetchProducts();
  }
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data;
        console.log('Products fetched:', this.products);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }
  closeModal() {
    this.activeModal.close();
  }
  findProductname(productId:number){
    const product = this.products.find((p: { productId: number; }) => p.productId == productId);
    return product ? product.name : 'Unknown Product';
  }
}

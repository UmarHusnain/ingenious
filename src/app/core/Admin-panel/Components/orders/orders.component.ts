import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../Services/orders.service';
import { IOrder } from '../../Interfaces/IOrder';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: IOrder[] = [];
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
  constructor(private orderService:OrdersService,private modalService: NgbModal){
  }
  ngOnInit(){
    this.fetchOrders()
  }
  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response) {
          this.orders = response;
          console.log("Orders retrieved:", this.orders);
        } else {
          console.error("Failed to retrieve orders:");
          this.showAlertMessage("Failed to retrieve orders:",'error')
        }
      },
      error: (error) => {
        console.error("Error fetching orders:", error);
      }
    });
  }
  navigateToAddOrders(){
 const modalRef = this.modalService.open(
    AddOrderComponent,
    this.modalOptions
  );

  modalRef.result.then(
    (result) => {
       // this.showAlertMessage('Product purchased successfully.', 'success');
        this.fetchOrders();
    },
    (reason) => {
      // Handle modal closing without selection
    }
  );
  }
  openEditorderModal(order:any){

  }
  openVieworderModal(order:any){
    const modalRef = this.modalService.open(
      OrderDetailComponent,
      this.modalOptions
    );
    modalRef.componentInstance.order=order
    modalRef.result.then(
      (result) => {
         // this.showAlertMessage('Product purchased successfully.', 'success');
         // this.fetchOrders();
      },
      (reason) => {
        // Handle modal closing without selection
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

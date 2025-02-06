import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../Services/categories.service';
@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;
  isLoading: boolean = false;
@Input() category: any;
//category= { name: 'Electronics', quantity: 50, price: 300, engineVersion: 'v1.0' }

constructor(public activeModal: NgbActiveModal,private categoryService:CategoriesService,private modalService: NgbModal) {}

closeModal(): void {
  this.activeModal.close();
}
toggleStatus(): void {
  this.category.isActive = !this.category.isActive;
}
saveCategory(){
  this.categoryService.upsertCategory(this.category).subscribe({
    next: (response) => {
      this.showAlertMessage("Category updated successfully",'success')
      console.log('Category updated successfully', response);
      this.modalService.dismissAll();
    },
    error: (err) => {
      this.showAlertMessage("Error updating category",'error')
      console.error('Error updating category', err);
    }
  });
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

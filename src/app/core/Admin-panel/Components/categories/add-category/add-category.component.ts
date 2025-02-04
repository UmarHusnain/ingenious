import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IEditCategory } from '../../../Interfaces/ICategory';
import { CategoriesService } from '../../../Services/categories.service';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  showAlert: boolean = false;
  isLoading: boolean = false;
  categoryObj:IEditCategory = {
    categoryId:0,
    name: '',
    slug: '',
    parentCategoryId:null,
    imageUrl:'',
    isActive:true
  };
  generateSlug(): void {
    this.categoryObj.slug = this.categoryObj.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove multiple hyphens
  }
  categories: Array<{ name: string; quantity: number; price: number; engineVersion: string }> = [];
  constructor(
    private activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    private categoryService:CategoriesService,
    private modalService: NgbModal
  ) {}
  showAlertMessage(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.closePopupMsg();
    }, 5000);
  }


  onSubmit() {
    console.log('Submitted categories:', this.categoryObj);

    this.categoryService.upsertCategory(this.categoryObj).subscribe({
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
  closePopupMsg() {
    this.showAlert = false;
  }
  closeModal() {
    this.activeModal.close();
  }
}

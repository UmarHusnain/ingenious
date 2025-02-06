import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoriesService } from '../../Services/categories.service';
import { ICategory } from '../../Interfaces/ICategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  modalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: false,
    keyboard: false,
  };
  categories: any[] = [];
  isLoading: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;
  deleteModalOptions: NgbModalOptions = {
    backdrop: false,
    keyboard: false
  };
  constructor(  private router: Router,private modalService: NgbModal,  private categoryService: CategoriesService){
    
  }
  ngOnInit(): void {
    this.fetchCategories(); 
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
  toggleStatus(category: ICategory): void {
    category.isActive = !category.isActive; // Toggle the status
    console.log(`Category ${category.name} status changed to:`, category.isActive);
  }
navigateToAddCategory(){
  const modalRef = this.modalService.open(
    AddCategoryComponent,
    this.modalOptions
  );

  modalRef.result.then(
    (result) => {
      if (result.statusCode === 200) {
        this.showAlertMessage('Product purchased successfully.', 'success');
      } else if (result.statusCode != 200) {
        this.showAlertMessage(
          result.message || 'Failed to purchase product.',
          'error'
        );
      }
    },
    (reason) => {
      // Handle modal closing without selection
    }
  );
}
openViewCategoryModal(category:any): void {
  const modalRef = this.modalService.open(CategoryDetailComponent, this.modalOptions);
  modalRef.componentInstance.category = category;
 
}
openEditCategoryModal(category:any): void {
  const modalRef = this.modalService.open(EditCategoryComponent, this.modalOptions);
  modalRef.componentInstance.category = category;
  modalRef.result.then(
    (result) => {
      if (result.statusCode === 200) {
        this.showAlertMessage('Product purchased successfully.', 'success');
      } else if (result.statusCode != 200) {
        this.showAlertMessage(
          result.message || 'Failed to purchase product.',
          'error'
        );
      }
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

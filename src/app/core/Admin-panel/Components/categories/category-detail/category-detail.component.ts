import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  @Input() category: any;
//category= { name: 'Electronics', quantity: 50, price: 300, engineVersion: 'v1.0' }
isLoading: boolean = false;

constructor(public activeModal: NgbActiveModal) {}

closeModal(): void {
  this.activeModal.close();
}
}

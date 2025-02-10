import { Component, Input } from '@angular/core';
import { IUser } from '../../../Interfaces/IUser';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
@Input() user:any
isLoading: boolean = false;

constructor(public activeModal: NgbActiveModal) {}

closeModal(): void {
  this.activeModal.close();
}
}

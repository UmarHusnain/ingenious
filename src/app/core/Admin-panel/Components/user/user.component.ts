import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Interfaces/IUser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  users:IUser[] = [];
   modalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: false,
      keyboard: false,
    };
    deleteModalOptions: NgbModalOptions = {
      backdrop: false,
      keyboard: false
    };

constructor(private userService:UserService,private modalService: NgbModal,){}
ngOnInit(): void {
  this.GetAllUsers();
}
GetAllUsers(){
  this.userService.getUsersByRole('Customer').subscribe(
    (data) => {
      this.users = data;
      console.log(this.users)
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}
openViewUserModal(user:any){
 const modalRef = this.modalService.open(UserDetailComponent, this.modalOptions);
  modalRef.componentInstance.user = user;
}
}

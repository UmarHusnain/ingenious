import { Component } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { ICart } from '../../../interfaces/ICart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: ICart[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    // Subscribe to cart items
    this.sharedService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    // Subscribe to subtotal and total
    this.sharedService.subtotal$.subscribe((subtotal) => {
      this.subtotal = subtotal;
    });

    this.sharedService.total$.subscribe((total) => {
      this.total = total;
    });
  }
}

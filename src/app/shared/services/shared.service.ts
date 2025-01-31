import { Injectable } from '@angular/core';
import { ICart } from '../../core/interfaces/ICart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cartItemsSubject = new BehaviorSubject<ICart[]>([]);
  private subtotalSubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  private isLoadingSource = new BehaviorSubject<boolean>(false);

  // Observables for cart state
  cartItems$ = this.cartItemsSubject.asObservable();
  subtotal$ = this.subtotalSubject.asObservable();
  total$ = this.totalSubject.asObservable();
  isLoading$ = this.isLoadingSource.asObservable();


  // Methods to update state
  setCartItems(cartItems: ICart[]): void {
    this.cartItemsSubject.next(cartItems);
    this.updateTotals(cartItems);
  }

  private updateTotals(cartItems: ICart[]): void {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    this.subtotalSubject.next(subtotal);
    this.totalSubject.next(subtotal); // Update total here if needed
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.subtotalSubject.next(0);
    this.totalSubject.next(0);
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoadingSource.next(isLoading);
  }
}

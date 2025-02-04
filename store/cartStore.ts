import { signal } from '@angular/core';
import { ICart } from '../src/app/core/interfaces/ICart';

// Signal to store cartItems
export const cartSignal = signal<ICart[]>([]);

// Method to add a cartItems
export const addCart = (newCartItems: ICart[]): void => {
  const currentCartItems = cartSignal();
  cartSignal.set([...newCartItems]);
};

// Method to initialize cartItems (e.g., adding static data for testing)
export const initializeStaticNotifications = (): void => {
  // const staticNotifications: ICart[] = [];
  // cartSignal.set(staticNotifications);
};

import { Injectable, signal } from '@angular/core';
import { Product } from './data';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<Product[]>([]);
  add(p: Product) { this.items.update((l) => [...l, p]); }
}

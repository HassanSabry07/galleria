import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../data';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <article [class.arch]="arch()">
      <a class="img" [routerLink]="['/product', p().id]" [attr.aria-label]="p().name">
        <img [src]="'img/' + p().img" [alt]="p().name" loading="lazy" />
      </a>
      <div class="meta"><h3>{{ p().name }}</h3><span>{{ p().price }}QR</span></div>
      <div class="act">
        <span class="stars" role="img" [attr.aria-label]="p().rating + ' out of 5'">{{ stars() }}</span>
        <button type="button" (click)="cart.add(p())">ADD TO CART</button>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; font-size: var(--card-fs, .85rem); }
    .img { display: block; aspect-ratio: var(--ratio, 5 / 6); overflow: hidden; background: #bfbcb3; }
    .arch .img { aspect-ratio: 3 / 4.2; border-radius: 999px 999px 0 0; }
    img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
    .img:hover img { transform: scale(1.03); }
    .meta { display: flex; justify-content: space-between; gap: .5em; margin-top: .55em; font-weight: 500; }
    h3 { font: inherit; }
    .act { display: flex; align-items: center; gap: .7em; margin-top: .5em; }
    .stars { color: var(--clay); letter-spacing: .12em; font-size: 1.05em; white-space: nowrap; }
    button { margin-left: auto; background: var(--clay); color: #f2e8df; border-radius: 999px; padding: .38em 1.1em; font-size: .72em; font-weight: 500; letter-spacing: .02em; transition: background .2s; }
    button:hover { background: #9f573a; }
  `,
})
export class ProductCard {
  readonly p = input.required<Product>();
  readonly arch = input(false);
  protected readonly cart = inject(CartService);
  protected stars() {
    const n = Math.floor(this.p().rating);
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
}

import { Component, ElementRef, input, viewChild } from '@angular/core';
import { Product } from '../data';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-product-row',
  imports: [ProductCard],
  template: `
    <section>
      <h2>{{ heading() }}</h2>
      <div class="wrap">
        <button type="button" class="arr l" aria-label="Previous" (click)="go(-1)"></button>
        <div class="track" #track>
          @for (p of items(); track p.id) { <app-product-card [p]="p" [arch]="true" /> }
        </div>
        <button type="button" class="arr r" aria-label="Next" (click)="go(1)"></button>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    h2 { font-size: 2rem; font-weight: 400; padding-left: 5.5%; margin-bottom: 2.4rem; }
    .wrap { position: relative; padding: 0 4.5%; }
    .track { display: grid; grid-auto-flow: column; grid-auto-columns: 19%; gap: 5.1%; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding: 0 1% 2px; }
    .track::-webkit-scrollbar { display: none; }
    .track > * { scroll-snap-align: start; }
    .arr { position: absolute; top: 14rem; width: 0; height: 0; border: .8rem solid transparent; opacity: .45; }
    .arr.l { left: 1.2%; border-right: 1.1rem solid #a9ad8f; border-left: 0; }
    .arr.r { right: 1.2%; border-left: 1.1rem solid #a9ad8f; border-right: 0; }
    .arr:hover { opacity: .9; }
    @media (max-width: 760px) { .track { grid-auto-columns: 62%; gap: 4%; } .arr { top: 9rem; } }
  `,
})
export class ProductRow {
  readonly heading = input.required<string>();
  readonly items = input.required<Product[]>();
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  protected go(dir: number) {
    const el = this.track().nativeElement;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }
}

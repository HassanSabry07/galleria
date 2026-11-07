import { Component, computed, inject, input, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { PRODUCTS } from '../data';

@Component({
  selector: 'app-detail-section',
  template: `
    <section>
      <img class="photo" [src]="'img/' + image()" [alt]="title()" loading="lazy" />
      <div class="info">
        <h2>{{ title() }}</h2>

        <p class="label">color</p>
        <div class="colors" role="group" aria-label="Color">
          @for (c of colors; track c; let i = $index) {
            <button type="button" [style.background]="c" [class.on]="color() === i" [attr.aria-pressed]="color() === i" [attr.aria-label]="'Color ' + (i + 1)" (click)="color.set(i)"></button>
          }
        </div>

        <div class="sizes" role="group" aria-label="Size">
          @for (s of sizes; track s) {
            <button type="button" [class.on]="size() === s" [attr.aria-pressed]="size() === s" (click)="size.set(s)">{{ s }}</button>
          }
        </div>

        <button type="button" class="btn-dark add" [class.added]="added()" (click)="addToCart()">{{ added() ? 'Added ✓' : 'Add to cart' }}</button>

        <p class="desc">The Ugmonk Essential tee is carefully cut and sewn by hand in Los Angeles, California. The tees are then enzyme washed for added softness and garment dyed to our own custom colors. The garment dye process creates subtle variations of color, making each tee truly unique. Since the tees are pre-shrunk, they will fit the same on day one as day one hundred.</p>

        <div class="tabs" role="tablist">
          @for (t of tabNames; track t) {
            <button type="button" role="tab" [class.on]="tab() === t" [attr.aria-selected]="tab() === t" (click)="tab.set(t)">{{ t }}</button>
          }
        </div>
        <ul class="panel" role="tabpanel">
          @for (line of tabs[tab()]; track line) { <li>- {{ line }}</li> }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { display: grid; grid-template-columns: 55.2% 1fr; column-gap: 14.6%; padding: var(--sec-top, 7rem) 2.1% 3rem 4.9%; }
    .photo { width: 100%; aspect-ratio: 644 / 804; object-fit: cover; }
    .info { padding-top: 7.8rem; max-width: 24rem; }
    h2 { font-size: 1.8rem; font-weight: 500; margin-bottom: 2.6rem; }
    .label { font-size: 1.05rem; padding-left: .5rem; margin-bottom: .6rem; }
    .colors { display: flex; gap: .8rem; padding-left: .5rem; flex-wrap: wrap; }
    .colors button { width: 1.45rem; height: 1.45rem; border-radius: 50%; transition: transform .25s; }
    .colors button:hover { transform: scale(1.18); }
    .colors button.on { outline: 1.5px solid var(--ink); outline-offset: 2px; }
    .sizes { display: flex; gap: .6rem; margin: 1.9rem 0 2rem; }
    .sizes button { min-width: 2.35rem; height: 2.35rem; font-size: .75rem; padding: 0 .5rem; transition: background .25s, color .25s; }
    .sizes button:hover { color: var(--clay); }
    .sizes button.on { background: var(--ink); color: var(--bg); }
    .add { display: block; margin: 0 auto 1.8rem; width: 12.2rem; padding: .85em 0; font-size: 1.3rem; text-align: center; transition: background .3s, transform .3s; }
    .add:hover { background: var(--clay); transform: translateY(-2px); }
    .add.added { background: var(--clay); }
    .desc { font-size: .8rem; font-weight: 300; line-height: 1.55; }
    .tabs { display: flex; gap: 1.5rem; margin: 2.2rem 0 1.2rem; font-size: .85rem; font-weight: 300; }
    .tabs button { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .3s; padding-bottom: .15em; }
    .tabs button:hover, .tabs button.on { background-size: 100% 1px; }
    .tabs button.on { font-weight: 400; }
    .panel { font-size: .8rem; font-weight: 300; line-height: 1.75; }
    @media (max-width: 760px) { section { grid-template-columns: 1fr; padding: 3rem 5% 2rem; } .info { padding-top: 1.6rem; max-width: none; } }
  `,
})
export class DetailSection {
  private readonly cart = inject(CartService);
  readonly productId = input('abaya');
  private readonly product = computed(() => PRODUCTS.find((p) => p.id === this.productId()) ?? PRODUCTS.find((p) => p.id === 'abaya')!);
  protected readonly title = computed(() => this.product().title ?? this.product().name);
  protected readonly image = computed(() => this.product().detailImg ?? this.product().img);

  protected readonly colors = ['#2a2a2e', '#000000', '#3b5a88', '#a9855f', '#55555a', '#a9a9b2', '#26474d', '#5c7036'];
  protected readonly sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  protected readonly color = signal(3);
  protected readonly size = signal('S');
  protected readonly added = signal(false);
  protected readonly tabNames = ['Details', 'Sizing', 'Shipping & Returns', 'Reviews'] as const;
  protected readonly tab = signal<(typeof this.tabNames)[number]>('Details');
  protected readonly tabs: Record<string, string[]> = {
    Details: ['Cut, sewn, and dyed in Los Angeles, CA, USA', 'Garment dyed', 'Pre-washed & pre-shrunk', 'Soft 100% ringspun cotton', "Model is 5'11'' wearing size S"],
    Sizing: ['True to size', "Model is 5'11'' wearing size S"],
    'Shipping & Returns': ['Flexible payment and shipping options', 'Easy returns on all authentic products'],
    Reviews: ['No reviews yet'],
  };
  protected addToCart() {
    this.cart.add(this.product());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1400);
  }
}

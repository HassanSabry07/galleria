import { Component, computed, input } from '@angular/core';
import { CATEGORIES, productsForCategory } from '../data';
import { ProductCard } from '../shared/product-card';
import { ScrollTo } from '../shared/scroll-to';

@Component({
  selector: 'app-category-section',
  imports: [ProductCard, ScrollTo],
  template: `
    <section>
      <h2>{{ label() }} <span class="c">C</span>ategories</h2>
      <div class="grid">
        @for (p of items(); track p.id) {
          <app-product-card [p]="p" />
        } @empty {
          <p class="empty">New arrivals are on the way.</p>
        }
      </div>
      <a class="btn-dark more more-link" scrollTo="product">see more</a>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { padding: 7.5rem 5% 0 6.2%; text-align: center; }
    h2 { text-align: left; font-size: 4.4rem; font-weight: 400; line-height: 1.1; margin-bottom: 2rem; }
    .c { font-family: var(--script); font-size: 1.55em; line-height: 0; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.7rem; --card-fs: 1.2rem; --ratio: 5 / 6; text-align: left; }
    .empty { grid-column: 1 / -1; font-size: 1.2rem; padding: 4rem 0; }
    .more { display: flex; width: max-content; margin: 4.6rem auto 0; padding: .55em 1.55em; font-size: 1.5rem; }
    @media (max-width: 760px) { section { padding-top: 4rem; } h2 { font-size: 3rem; } .grid { grid-template-columns: repeat(2, 1fr); gap: 1.6rem 1rem; --card-fs: .95rem; } }
  `,
})
export class CategorySection {
  readonly slug = input('men');
  protected readonly items = computed(() => productsForCategory(this.slug()));
  protected readonly label = computed(() => CATEGORIES.find((c) => c.slug === this.slug())?.label ?? this.slug());
}

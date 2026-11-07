import { Component, signal } from '@angular/core';
import { CATALOG } from '../data';
import { ProductCard } from '../shared/product-card';
import { ScrollTo } from '../shared/scroll-to';

interface Group { title: string; chips: string[]; }

@Component({
  selector: 'app-products-section',
  imports: [ProductCard, ScrollTo],
  template: `
    <section>
      <h2>OUR <span class="p">P</span>RODUCTS</h2>
      <p class="sub">YOUR TRUST, OUR PROMISE: 100% AUTHENTIC PRODUCTS.</p>

      <div class="layout" [class.closed]="!open()">
        @if (open()) {
          <aside aria-label="Filters">
            @for (g of groups; track g.title) {
              <div class="group">
                <h3>{{ g.title }} <span>—</span></h3>
                <div class="chips">
                  @for (c of g.chips; track c) {
                    <button type="button" [class.on]="selected().has(c)" [attr.aria-pressed]="selected().has(c)" (click)="toggle(c)">{{ c }}</button>
                  }
                </div>
              </div>
            }
            <button type="button" class="close" (click)="open.set(false)">✕ Close</button>
          </aside>
        } @else {
          <button type="button" class="reopen" aria-label="Show filters" (click)="open.set(true)"></button>
        }
        <div class="grid">
          @for (p of items; track p.id) { <app-product-card [p]="p" /> }
        </div>
      </div>
      <a class="btn-dark more more-link" scrollTo="men">see more</a>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { padding: 6.5rem 1% 0; }
    h2 { font-size: 5.4rem; font-weight: 400; line-height: 1.1; padding-left: 4.6%; letter-spacing: .01em; }
    .p { font-family: var(--script); font-size: 1.6em; line-height: 0; margin: 0 -.12em 0 .02em; }
    .sub { padding-left: 4.9%; margin-top: .9rem; font-size: 1.2rem; font-weight: 500; }
    .layout { display: grid; grid-template-columns: 23.5% 1fr; gap: 2.4%; margin-top: 4rem; align-items: start; }
    .layout.closed { grid-template-columns: 1.5rem 1fr; }
    aside { background: rgba(255, 255, 255, .1); padding: 1.7rem 1.3rem 0; font-size: .78rem; position: sticky; top: 1rem; max-height: 44rem; overflow: hidden; }
    .group { margin-bottom: 1.4rem; }
    h3 { display: flex; justify-content: space-between; font-size: .66rem; font-weight: 700; letter-spacing: .03em; padding-bottom: .7rem; border-bottom: 1px solid rgba(38, 31, 22, .25); margin-bottom: .9rem; }
    .chips { display: flex; flex-wrap: wrap; gap: .45rem .4rem; }
    .chips button { border: 1px solid rgba(38, 31, 22, .4); border-radius: 999px; padding: .15em .65em; font-size: .72rem; font-weight: 500; transition: background .25s, color .25s, border-color .25s; }
    .chips button:hover { border-color: var(--clay); color: var(--clay); }
    .chips button.on { background: var(--ink); color: var(--bg); border-color: var(--ink); }
    .close { display: block; width: calc(100% + 2.6rem); margin: 0 -1.3rem; padding: .9rem 1.3rem; text-align: right; font-size: .72rem; font-weight: 600; background: rgba(255,255,255,.12); border-top: 1px solid rgba(38,31,22,.12); position: sticky; bottom: 0; transition: color .25s; }
    .close:hover { color: var(--clay); }
    .reopen { width: 0; height: 0; border: .6rem solid transparent; border-right: .9rem solid #a9ad8f; border-left: 0; margin-top: 30rem; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.2rem 4.1rem; --card-fs: 1.1rem; --ratio: 197 / 237; padding-right: 1.5%; }
    .more { display: flex; width: max-content; margin: 4rem auto 0; font-size: 1.45rem; padding: .55em 1.5em; }
    @media (max-width: 760px) {
      h2 { font-size: 3.2rem; padding-left: 5%; } .sub { padding-left: 5%; font-size: .9rem; }
      .layout, .layout.closed { grid-template-columns: 1fr; } aside { position: static; max-height: 24rem; overflow: auto; margin: 0 4%; }
      .reopen { margin: 0 0 0 5%; } .grid { grid-template-columns: repeat(2, 1fr); gap: 1.6rem 1rem; --card-fs: .9rem; padding: 0 4%; }
    }
  `,
})
export class ProductsSection {
  protected readonly items = CATALOG;
  protected readonly open = signal(true);
  protected readonly selected = signal<Set<string>>(new Set());
  protected readonly groups: Group[] = [
    { title: 'RITUAL', chips: ['Evening', 'Focus', 'Pleasure', 'Relief'] },
    { title: 'ORIGIN', chips: ['Canada', 'China', 'Czech Republic', 'France', 'Germany', 'India', 'Italy', 'Japan', 'Netherlands', 'Sweden', 'Switzerland', 'UK', 'USA'] },
    { title: 'ETHICS', chips: ['Artisan Made', 'BIPOC Founders', 'Community Engaged Company', 'Female Founders', 'Lab Tested', 'Less than 0,2% THC', 'Organic', 'Sustainable Practices', 'Vegan'] },
    { title: 'CBD CONCENTRATION', chips: ['1-10%', '11 to 20% CBD', '21 to 30% CBD', '31 to 40% CBD'] },
  ];
  protected toggle(chip: string) {
    this.selected.update((s) => { const n = new Set(s); n.has(chip) ? n.delete(chip) : n.add(chip); return n; });
  }
}

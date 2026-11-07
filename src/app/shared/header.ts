import { afterNextRender, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { ScrollTo } from './scroll-to';

const SECTIONS = ['home', 'products', 'about', 'contact'];
const PAGE_TO_SECTION: Record<string, string> = { '/products': 'products', '/about': 'about', '/contact': 'contact' };

@Component({
  selector: 'app-header',
  imports: [RouterLink, ScrollTo],
  template: `
    <header [class.dark]="dark()" [class.over]="overlay()">
      <a routerLink="/" class="logo" aria-label="Galleria home">GALLERIA</a>
      <nav aria-label="Main">
        <a scrollTo="home" [class.on]="active() === 'home'">HOME</a>
        <a scrollTo="products" [class.on]="active() === 'products'">OUR PRODUCTS</a>
        <a scrollTo="about" [class.on]="active() === 'about'">ABOUT US</a>
        <a scrollTo="contact" [class.on]="active() === 'contact'">CONTACT US</a>
      </nav>
      <form class="search" role="search" (submit)="$event.preventDefault()">
        <input type="search" aria-label="Search" />
        <button type="submit" aria-label="Search">
          <svg viewBox="0 0 14 14" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="6" r="4.2"/><path d="M9.2 9.2 12.5 12.5"/></svg>
        </button>
      </form>
      @if (utility()) {
        <div class="util">
          <a href="#" (click)="$event.preventDefault()">Login</a>
          <a href="#" (click)="$event.preventDefault()">Help</a>
          <a scrollTo="contact">Contact us</a>
          <a href="#" class="cart" (click)="$event.preventDefault()" [attr.aria-label]="'Cart, ' + cart.items().length + ' items'">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            @if (cart.items().length) { <b>{{ cart.items().length }}</b> }
          </a>
        </div>
      }
    </header>
  `,
  styles: `
    :host { display: block; position: relative; z-index: 5; }
    header { display: flex; align-items: center; padding: 2.2rem 2.4% 0 5%; font-size: 1.28rem; }
    header.over { position: absolute; inset: 0 0 auto 0; padding-top: 1.9rem; }
    .logo { font-family: var(--display); font-size: 2.3rem; letter-spacing: .01em; line-height: 1; font-weight: 400; transition: opacity .25s; }
    .logo:hover { opacity: .65; }
    nav { margin-left: auto; display: flex; gap: 2.7rem; margin-right: 2rem; }
    nav a { position: relative; padding: .2em 0; transition: color .25s; }
    nav a::after { content: ''; position: absolute; left: 0; right: 0; bottom: -.15em; height: 1.5px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .4s cubic-bezier(.2, .7, .2, 1); }
    nav a:hover, nav a.on { color: var(--clay); }
    nav a:hover::after, nav a.on::after { transform: scaleX(1); }
    .search { width: 13rem; height: 2.3rem; border: 1.5px solid currentColor; border-radius: 999px; display: flex; align-items: center; padding: 0 .3rem 0 .9rem; transition: width .4s cubic-bezier(.2, .7, .2, 1), border-color .25s; }
    .search:focus-within, .search:hover { width: 16rem; border-color: var(--clay); }
    .search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; font: inherit; color: inherit; font-size: .9rem; }
    .search button { width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--ink); color: var(--bg); display: grid; place-items: center; transition: background .25s; }
    .search button:hover { background: var(--clay); }
    .util { position: absolute; right: 2.4%; top: 5.9rem; display: flex; font-size: .85rem; font-weight: 300; }
    .util a { padding: 0 .9rem; border-right: 1px solid var(--ink); display: flex; align-items: center; gap: .3rem; line-height: 1.1; transition: color .25s; }
    .util a:hover { color: var(--clay); }
    .util a:last-child { border: 0; padding-right: 0; }
    .util b { font-size: .7rem; font-weight: 600; background: var(--clay); color: #fff; border-radius: 999px; padding: 0 .4em; }
    header.dark { color: var(--bg); }
    header.dark .search button { background: var(--bg); color: var(--ink); }
    @media (max-width: 760px) {
      header { flex-wrap: wrap; gap: .8rem; padding: 1.2rem 5% 0; }
      header.over { position: relative; }
      nav { order: 3; width: 100%; margin: 0; gap: 1.3rem; overflow-x: auto; font-size: .95rem; }
      .logo { font-size: 2rem; }
      .search, .search:hover, .search:focus-within { margin-left: auto; width: 9rem; }
      .util { position: static; width: 100%; justify-content: flex-end; order: 4; }
    }
  `,
})
export class Header {
  readonly dark = input(false);
  readonly overlay = input(false);
  readonly utility = input(false);
  protected readonly cart = inject(CartService);
  protected readonly active = signal('');
  private readonly router = inject(Router);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let frame = 0;
      const update = () => {
        frame = 0;
        const path = this.router.url.split(/[?#]/)[0];
        if (path !== '/') { this.active.set(PAGE_TO_SECTION[path] ?? ''); return; }
        const line = window.innerHeight * 0.4;
        let current = 'home';
        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        this.active.set(current);
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener('scroll', onScroll, { passive: true });
      const t = setTimeout(update, 250);
      update();
      destroyRef.onDestroy(() => { window.removeEventListener('scroll', onScroll); clearTimeout(t); });
    });
  }
}

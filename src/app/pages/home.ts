import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BEST_SELLING, CATEGORIES, OFFERS } from '../data';
import { AboutSection } from '../sections/about-section';
import { CategorySection } from '../sections/category-section';
import { ContactSection } from '../sections/contact-section';
import { DetailSection } from '../sections/detail-section';
import { ProductsSection } from '../sections/products-section';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';
import { ProductRow } from '../shared/product-row';
import { Reveal } from '../shared/reveal';
import { ScrollTo } from '../shared/scroll-to';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollTo, Reveal, Header, Footer, ProductRow, ProductsSection, CategorySection, DetailSection, AboutSection, ContactSection],
  template: `
    <section id="home" class="hero" style="background-image: url('img/hero.jpg')">
      <app-header [overlay]="true" />
      <div class="copy">
        <h1><span class="g">G</span>alleria</h1>
        <p class="tag">– Your Premier Digital Destination for Luxury<br />Fashion and Refined Lifestyle</p>
        <a class="more more-link" scrollTo="about">SEE MORE...</a>
      </div>
    </section>

    <section class="intro" reveal>
      <p><strong>GALLERIA</strong> is a comprehensive online platform, bringing together luxury fashion, refined accessories, beauty products, and exclusive lifestyle elements. It has been designed for enthusiasts of elegance and individuality across the region, who seek a digital shopping experience that reflects their exquisite taste and meets their needs in every detail.</p>
      <a class="link-line" scrollTo="products">Shop Now</a>
    </section>

    <section id="categories" class="cats" reveal>
      <h2>CATEGORIES</h2>
      <ul>
        @for (c of categories; track c.slug) {
          <li>
            @if (c.slug === 'men') {
              <a scrollTo="men" class="on">{{ c.label }}</a>
            } @else {
              <a [routerLink]="['/category', c.slug]">{{ c.label }}</a>
            }
          </li>
        }
      </ul>
      <svg class="ring" viewBox="0 0 300 300" aria-hidden="true">
        <defs><path id="ring" d="M150,285 A135,135 0 1 1 150,15 A135,135 0 1 1 150,285" /></defs>
        <text><textPath href="#ring">Shop smart. Live better. Delivered to your door</textPath></text>
      </svg>
    </section>

    <app-product-row class="best" reveal heading="BEST SELLING" [items]="best" />

    <section class="sale" reveal style="background-image: url('img/sale.jpg')">
      <div>
        <p class="off">40%OFF</p>
        <p class="word">SALE</p>
        <a class="btn-dark more-link" scrollTo="products">BUY NOW</a>
      </div>
    </section>

    <section class="why" reveal>
      <div class="txt">
        <h2>WHY CHOOSE US</h2>
        <p>A trusted Qatari platform that brings together the best global and local brands, offering a seamless shopping experience with flexible payment and shipping options, full support for local and regional designers, and guaranteed authentic products backed by reviews from real customers<a class="link-line" scrollTo="products">Shop Now</a></p>
      </div>
      <div class="pic">
        <img src="img/why.jpg" alt="Gold bracelets and ring on a wrist" loading="lazy" />
        <span class="sig" aria-hidden="true">Galleria</span>
      </div>
    </section>

    <app-product-row class="offers" reveal heading="OFFERS" [items]="offers" />

    <app-products-section id="products" reveal />
    <app-category-section id="men" reveal slug="men" />
    <app-detail-section id="product" reveal />
    <app-about-section id="about" reveal />
    <app-contact-section id="contact" reveal />

    <app-footer [info]="true" />
  `,
  styles: `
    :host { display: block; overflow-x: clip; }
    .hero { position: relative; aspect-ratio: 2 / 1; background-size: cover; background-position: center; }
    .copy { position: absolute; left: 41.6%; top: 40%; }
    h1 { font-size: 8.1rem; font-weight: 500; line-height: 1; letter-spacing: .01em; white-space: nowrap; }
    .g { font-family: var(--script); font-weight: 400; font-size: 1.55em; line-height: 0; margin-right: -.12em; position: relative; top: .06em; }
    .tag { font-size: 1.33rem; font-weight: 500; line-height: 1.2; margin: .4rem 0 0 .35rem; }
    .more { margin: 1.5rem 0 0 .35rem; border: 2px solid var(--clay); border-radius: 999px; padding: .15em .8em; font-size: 1.35rem; font-weight: 500; }
    .intro { padding: 4.6rem 14% 0 6%; font-size: 1.02rem; line-height: 1.33; }
    .intro p { text-align: justify; }
    .intro strong { font-size: 1.28rem; font-weight: 700; }
    .intro a { display: inline-block; }
    .cats { position: relative; padding: 7.2rem 0 0 6%; }
    .cats h2 { font-size: 2.15rem; font-weight: 400; margin-bottom: 1.5rem; }
    .cats ul { display: grid; grid-template-columns: repeat(4, 9.2rem); justify-content: space-between; width: 77%; margin-left: -.55rem; gap: 3.1rem 0; }
    .cats li a { display: grid; place-items: center; height: 3.15rem; border-radius: 999px; background: var(--ink); color: var(--bg); font-size: 1.36rem; transition: background .3s, color .3s, transform .3s; }
    .cats li a.on, .cats li a:hover { background: var(--clay); color: #f1e4da; transform: translateY(-3px); }
    .ring { position: absolute; right: -10rem; top: 3.5rem; width: 20rem; animation: spin 26s linear infinite; }
    .ring:hover { animation-play-state: paused; }
    .ring text { font: 600 15px var(--sans); fill: var(--ink); letter-spacing: .4px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .best { padding-top: 7rem; }
    .sale { margin-top: 4.5rem; height: 36vw; background-size: cover; background-position: center; position: relative; }
    .sale div { position: absolute; left: 60.7%; top: 50%; transform: translate(-50%, -50%); text-align: center; }
    .off { font-size: 3.4rem; font-weight: 600; letter-spacing: .06em; line-height: 1.1; }
    .word { font-size: 5.1rem; font-weight: 300; letter-spacing: .14em; line-height: 1.1; margin-bottom: 1.4rem; }
    .sale .btn-dark { font-size: 1.15rem; padding: .7em 1.8em; font-weight: 500; }
    .why { display: grid; grid-template-columns: 1fr 21%; gap: 3%; padding: 5.6rem 7.5% 0 4.2%; align-items: end; }
    .why h2 { font-size: 3.2rem; font-weight: 400; line-height: 1.1; margin-bottom: 1rem; }
    .why .txt { padding-bottom: 6rem; }
    .why p { font-size: .82rem; font-weight: 500; line-height: 1.4; max-width: 28em; }
    .why p a { display: table; }
    .pic { position: relative; }
    .pic img { width: 100%; aspect-ratio: 246 / 377; object-fit: cover; border-radius: 62% 0 0 0 / 32% 0 0 0; }
    .sig { position: absolute; left: -52%; bottom: -3%; font-family: var(--script); font-size: 5.2rem; color: var(--clay); transform: rotate(-7deg); line-height: 1; white-space: nowrap; }
    .offers { padding-top: 5rem; }
    @media (max-width: 760px) {
      .hero { aspect-ratio: auto; min-height: 120vw; background-position: 18% top; }
      .copy { left: 6%; top: 52%; } h1 { font-size: 5.4rem; }
      .tag { font-size: 1.1rem; } .intro { padding-right: 6%; }
      .cats ul { grid-template-columns: repeat(2, 1fr); width: 88%; gap: 1.2rem; } .ring { display: none; }
      .sale { height: 70vw; } .sale div { left: 64%; } .off { font-size: 2.4rem; } .word { font-size: 3.4rem; }
      .why { grid-template-columns: 1fr; } .why .txt { padding-bottom: 1rem; } .pic { width: 60%; margin-left: auto; } .sig { left: -60%; font-size: 4rem; }
    }
  `,
})
export class Home {
  protected readonly categories = CATEGORIES;
  protected readonly best = BEST_SELLING;
  protected readonly offers = OFFERS;
}

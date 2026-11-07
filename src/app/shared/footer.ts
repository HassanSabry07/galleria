import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer [class.dark]="dark()">
      @if (info()) {
        <div class="row">
          <div class="brand">
            <span class="logo">GALLERIA</span>
            <p>– Your Premier Digital Destination for Luxury<br />Fashion and Refined Lifestyle</p>
          </div>
          <div class="social">
            <a href="#" aria-label="Facebook" (click)="$event.preventDefault()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" aria-label="Twitter" (click)="$event.preventDefault()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
            <a href="#" aria-label="Instagram" (click)="$event.preventDefault()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg></a>
          </div>
        </div>
      }
      <svg class="wm" viewBox="0 100 1200 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <text x="0" y="410" textLength="1130" lengthAdjust="spacingAndGlyphs">GALLERIA</text>
        <text x="1150" y="150" class="r">®</text>
      </svg>
    </footer>
  `,
  styles: `
    :host { display: block; }
    footer { overflow: hidden; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 6rem 5.5% 8rem 5.5%; }
    .brand { display: flex; align-items: center; gap: 1.2rem; }
    .logo { font-family: var(--display); font-size: 2.1rem; line-height: 1; }
    .brand p { font-size: .95rem; font-weight: 500; line-height: 1.25; }
    .social { display: flex; gap: .7rem; padding-right: 1.5rem; }
    .social a { width: 1.7rem; height: 1.7rem; border-radius: 50%; background: var(--ink); color: var(--bg); display: grid; place-items: center; }
    .social svg { width: 55%; height: 55%; }
    .wm { display: block; width: 100%; height: auto; aspect-ratio: 6 / 1; }
    .wm text { font-family: var(--display); font-size: 420px; fill: var(--ghost); }
    .wm .r { font-family: var(--sans); font-size: 28px; fill: var(--ghost); }
    footer.dark .wm text { fill: #30281e; }
    @media (max-width: 760px) { .row { flex-direction: column; gap: 1.5rem; align-items: flex-start; padding: 3rem 5% 3rem; } }
  `,
})
export class Footer {
  readonly info = input(false);
  readonly dark = input(false);
}

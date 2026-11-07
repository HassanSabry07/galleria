import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/** Fades + slides an element in the first time it scrolls into view. */
@Directive({ selector: '[reveal]', host: { class: 'rv' } })
export class Reveal {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('rv-in');
        return;
      }
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { el.classList.add('rv-in'); io.disconnect(); }
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}

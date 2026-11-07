import { Directive, inject, input } from '@angular/core';
import { Router } from '@angular/router';

/** <a scrollTo="about"> → smooth-scrolls to #about on the home page (navigates home first if needed). */
@Directive({
  selector: 'a[scrollTo]',
  host: { '[attr.href]': '"/#" + scrollTo()', '(click)': 'onClick($event)' },
})
export class ScrollTo {
  readonly scrollTo = input.required<string>();
  private readonly router = inject(Router);

  protected onClick(e: Event) {
    e.preventDefault();
    const id = this.scrollTo();
    const onHome = this.router.url.split(/[?#]/)[0] === '/';
    const el = document.getElementById(id);
    if (onHome && el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id === 'home' ? '/' : '/#' + id);
    } else {
      this.router.navigate(['/'], { fragment: id === 'home' ? undefined : id });
    }
  }
}

import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CategorySection } from '../sections/category-section';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-category',
  imports: [Header, CategorySection, Footer],
  template: `<app-header /><app-category-section [slug]="slug()" /><app-footer />`,
  styles: `:host { display: block; }`,
})
export class Category {
  protected readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((m) => m.get('slug') ?? 'men')), { initialValue: 'men' });
}

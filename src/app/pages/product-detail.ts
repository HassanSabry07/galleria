import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DetailSection } from '../sections/detail-section';
import { Header } from '../shared/header';

@Component({
  selector: 'app-product-detail',
  imports: [Header, DetailSection],
  template: `<app-header [utility]="true" /><app-detail-section [productId]="id()" />`,
  styles: `:host { display: block; --sec-top: 1.1rem; }`,
})
export class ProductDetail {
  protected readonly id = toSignal(inject(ActivatedRoute).paramMap.pipe(map((m) => m.get('id') ?? 'abaya')), { initialValue: 'abaya' });
}

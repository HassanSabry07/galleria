import { Component } from '@angular/core';
import { ProductsSection } from '../sections/products-section';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-products',
  imports: [Header, ProductsSection, Footer],
  template: `<app-header /><app-products-section /><app-footer />`,
  styles: `:host { display: block; }`,
})
export class Products {}

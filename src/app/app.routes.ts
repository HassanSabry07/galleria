import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Galleria', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'products', title: 'Our Products — Galleria', loadComponent: () => import('./pages/products').then((m) => m.Products) },
  { path: 'category/:slug', title: 'Categories — Galleria', loadComponent: () => import('./pages/category').then((m) => m.Category) },
  { path: 'product/:id', title: 'Product — Galleria', loadComponent: () => import('./pages/product-detail').then((m) => m.ProductDetail) },
  { path: 'about', title: 'About Us — Galleria', loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'contact', title: 'Contact Us — Galleria', loadComponent: () => import('./pages/contact').then((m) => m.Contact) },
  { path: '**', redirectTo: '' },
];

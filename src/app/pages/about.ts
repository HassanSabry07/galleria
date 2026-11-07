import { Component } from '@angular/core';
import { AboutSection } from '../sections/about-section';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-about',
  imports: [Header, AboutSection, Footer],
  template: `<app-header [dark]="true" /><app-about-section /><app-footer [dark]="true" />`,
  styles: `:host { display: block; background: var(--ink); color: var(--bg); min-height: 100vh; }`,
})
export class About {}

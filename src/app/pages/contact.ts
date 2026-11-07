import { Component } from '@angular/core';
import { ContactSection } from '../sections/contact-section';
import { Footer } from '../shared/footer';
import { Header } from '../shared/header';

@Component({
  selector: 'app-contact',
  imports: [Header, ContactSection, Footer],
  template: `<app-header /><app-contact-section /><app-footer />`,
  styles: `:host { display: block; }`,
})
export class Contact {}

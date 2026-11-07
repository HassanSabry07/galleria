import { Component } from '@angular/core';

@Component({
  selector: 'app-about-section',
  template: `
    <section>
      <div class="inner">
        <div class="photo"><img src="img/about.jpg" alt="Model in a camel belted jacket" loading="lazy" /></div>
        <span class="sig" aria-hidden="true">Galleria</span>
        <div class="txt">
          <h2><span class="a">A</span>BOUT US</h2>
          <p>At Galleria, we believe that luxury is a lifestyle that transcends mere acquisition. We offer a curated selection from the most prominent international brands, alongside local and regional designers, to blend global sophistication with authentic cultural identity. Whether you’re seeking a unique signature piece or a complete look, we are here to give you a one-of-a-kind shopping experience that reflects your personality and complements your exquisite taste.</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { background: var(--ink); color: var(--bg); padding: 7rem 5% 4rem 4.9%; }
    .inner { position: relative; height: 57.2vw; }
    .photo { position: absolute; inset: 0 auto 0 0; width: 50.2%; overflow: hidden; }
    .photo::after { content: ''; position: absolute; inset: 0; background: rgba(38, 31, 22, .38); transition: opacity .6s; }
    .photo:hover::after { opacity: .5; }
    img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 1.2s cubic-bezier(.2, .7, .2, 1); }
    .photo:hover img { transform: scale(1.04); }
    .sig { position: absolute; left: 36%; top: -3.4rem; font-family: var(--script); font-size: 6.2rem; line-height: 1; color: var(--clay); transform: rotate(-4deg); }
    .txt { position: absolute; left: 31.8%; right: 0; top: 47%; }
    h2 { font-size: 5.4rem; font-weight: 400; line-height: 1.1; }
    .a { font-family: var(--script); font-size: 1.6em; line-height: 0; margin-right: -.12em; }
    p { margin-top: 1.1rem; max-width: 51rem; text-align: justify; font-size: 1.13rem; line-height: 1.2; color: rgba(206, 205, 196, .88); }
    @media (max-width: 760px) {
      section { padding-top: 5rem; } .inner { height: auto; }
      .photo, .txt { position: static; width: 100%; } .photo { aspect-ratio: 4 / 5; }
      .sig { left: 38%; top: -3rem; font-size: 4.4rem; } .txt { margin-top: -1.8rem; } h2 { font-size: 3.6rem; } p { font-size: 1rem; }
    }
  `,
})
export class AboutSection {}

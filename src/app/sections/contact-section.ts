import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  template: `
    <section>
      <div class="card">
        <h2><span class="c">C</span>ONTACT US</h2>
        <dl>
          <div><dt>Address:</dt><dd>{{ info.address }}</dd></div>
          <div><dt>Phone:</dt><dd>{{ info.phone }}</dd></div>
          <div><dt>Email:</dt><dd>{{ info.email }}</dd></div>
        </dl>
        @if (sent(); as name) {
          <p class="ok" role="status">Thank you, {{ name }}. Your message has been sent.</p>
        } @else {
          <form (submit)="submit($event)">
            <div class="two">
              <label>Your Name<input name="name" placeholder="Your full name" required autocomplete="name" /></label>
              <label>Email address<input name="email" type="email" placeholder="Your email address" required autocomplete="email" /></label>
            </div>
            <label>Message<textarea name="message" rows="6" placeholder="Write something...." required></textarea></label>
            <button type="submit" class="btn-dark more-link">Send message</button>
          </form>
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { padding: 7rem 0 0; }
    .card { width: 72%; margin: 0 auto; padding: 0 1.8rem 1.8rem; background: rgba(255, 255, 255, .04); border: 1px solid rgba(255, 255, 255, .22); }
    h2 { font-size: 3.5rem; font-weight: 500; line-height: 1.3; padding-top: .8rem; }
    .c { font-family: var(--script); font-size: 1.7em; line-height: 0; margin-right: -.1em; font-weight: 400; }
    dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0 5rem; font-size: .75rem; }
    dt { font-weight: 500; }
    dd { min-height: 1.2em; }
    form { display: grid; gap: 1rem; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 1.3rem; }
    label { display: grid; gap: .5rem; font-size: .72rem; font-weight: 500; }
    input, textarea { font: inherit; font-size: .75rem; font-weight: 400; color: var(--ink); background: rgba(38, 31, 22, .06); border: 0; border-radius: .45rem; padding: .95rem 1rem; box-shadow: 0 1px 3px rgba(0, 0, 0, .12); resize: vertical; transition: box-shadow .3s, background .3s; }
    input:focus, textarea:focus { outline: none; background: rgba(38, 31, 22, .09); box-shadow: 0 0 0 1.5px var(--clay); }
    ::placeholder { color: #66615a; }
    .btn-dark { justify-self: start; margin-top: .4rem; font-size: 1.2rem; padding: .75em 1.4em; }
    .ok { font-size: 1.1rem; padding: 3rem 0; }
    @media (max-width: 760px) { section { padding-top: 4rem; } .card { width: 92%; } h2 { font-size: 2.6rem; } dl, .two { grid-template-columns: 1fr; } dl { margin-bottom: 2rem; } }
  `,
})
export class ContactSection {
  protected readonly info = { address: 'Doha, Qatar', phone: '—', email: '—' }; // TODO: replace with real contact details
  protected readonly sent = signal<string | null>(null);
  protected submit(e: Event) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    this.sent.set(String(data.get('name') ?? '').trim() || 'friend'); // front-end only: wire to your API here
  }
}

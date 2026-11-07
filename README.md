# Galleria — Angular front-end

Angular (standalone components, signals, lazy-loaded routes). No backend.

    npm install
    npm start        # http://localhost:4200
    npm run build

Pages: `/` home · `/products` · `/category/:slug` · `/product/:id` · `/about` · `/contact`

## Fonts
- Montserrat + Pinyon Script (script initials) load from Google Fonts in `src/index.html`.
- The logo/wordmark uses **Bastliga One** (the font in the PDF). Put `BastligaOne.ttf` in `public/fonts/`.
  Until then it falls back to Cormorant Garamond.
- The script initials/signature in the PDF use Edwardian Script ITC (not free); Pinyon Script is the closest match.

## Placeholders to replace
- Product detail description and filter chips (Ritual/Origin/Ethics/CBD) are copied as-is from the PDF.
- Contact page address/phone/email: `src/app/pages/contact.ts`.
- Products: `src/app/data.ts`. Images: `public/img/`.

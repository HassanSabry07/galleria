export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  img: string;
  cat: string;
  title?: string;
  detailImg?: string;
}

export const PRODUCTS: Product[] = [
  // Best selling
  { id: 'womens-set', name: "Women's clothing", price: 200, rating: 4.5, img: 'best-1.jpg', cat: 'women' },
  { id: 'mens-jacket', name: "Men's jacket", price: 300, rating: 5, img: 'best-2.jpg', cat: 'men' },
  { id: 'serum', name: 'SKIN CARE Serum', price: 45, rating: 5, img: 'best-3.jpg', cat: 'beauty' },
  { id: 'chair', name: 'Elegant chair', price: 1000, rating: 5, img: 'best-4.jpg', cat: 'home' },
  // Offers
  { id: 'mens-watch', name: "Men's watch", price: 200, rating: 4.5, img: 'offer-1.jpg', cat: 'accessories' },
  { id: 'chair-lounge', name: 'Elegant chair', price: 300, rating: 5, img: 'offer-2.jpg', cat: 'home' },
  { id: 'bag', name: 'Elegant bag', price: 45, rating: 5, img: 'offer-3.jpg', cat: 'accessories' },
  { id: 'cuff', name: 'Accessories', price: 1000, rating: 5, img: 'offer-4.jpg', cat: 'accessories' },
  // Our products
  { id: 'serum-2', name: 'SKIN CARE Serum', price: 45, rating: 5, img: 'prod-1.jpg', cat: 'beauty' },
  { id: 'coat', name: "Women's clothing", price: 200, rating: 4, img: 'prod-2.jpg', cat: 'women' },
  { id: 'kids', name: "kids's clothing", price: 500, rating: 4, img: 'prod-3.jpg', cat: 'kids' },
  { id: 'bracelet', name: 'Accessories', price: 1000, rating: 5, img: 'prod-4.jpg', cat: 'accessories' },
  { id: 'abaya', name: "Women's clothing", price: 200, rating: 4, img: 'prod-5.jpg', cat: 'women', title: "Women's Abaya", detailImg: 'abaya.jpg' },
  { id: 'jacket-2', name: "Men's jacket", price: 300, rating: 5, img: 'prod-6.jpg', cat: 'men' },
  // Men categories
  { id: 'men-watch', name: "men's clothing", price: 200, rating: 5, img: 'men-1.jpg', cat: 'men' },
  { id: 'men-kaftan', name: "men's clothing", price: 45, rating: 5, img: 'men-2.jpg', cat: 'men' },
  { id: 'men-set', name: "men's clothing", price: 200, rating: 4, img: 'men-3.jpg', cat: 'men' },
  { id: 'men-shoes', name: "men's clothing", price: 200, rating: 4, img: 'men-4.jpg', cat: 'men' },
];

export const BEST_SELLING = PRODUCTS.slice(0, 4);
export const OFFERS = PRODUCTS.slice(4, 8);
export const CATALOG = PRODUCTS.slice(8, 14);
export const MEN = PRODUCTS.slice(14, 18);

export const CATEGORIES = [
  { label: 'MEN', slug: 'men' }, { label: 'WOMEN', slug: 'women' },
  { label: 'HOME', slug: 'home' }, { label: 'KIDS', slug: 'kids' },
  { label: 'Accessories', slug: 'accessories' }, { label: 'Beauty', slug: 'beauty' },
  { label: 'TOYS', slug: 'toys' }, { label: 'Electronics', slug: 'electronics' },
];

export function productsForCategory(slug: string): Product[] {
  return slug === 'men' ? MEN : PRODUCTS.filter((p) => p.cat === slug);
}

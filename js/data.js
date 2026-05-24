// Sneaker inventory data
const SNEAKERS = [
  { id: 'aj1-chicago', brand: 'Jordan', model: '1 Retro High OG', colorway: 'Chicago', lowestAsk: 68995, lastSale: 65545, highestBid: 62095, changeAbs: 678, changePct: 5.4, releaseDate: '2022-11-19', retail: 10170, sku: 'DZ5485-612', hue: 'from-red-200 to-white', image: 'Product Images/Nike Air Jordan 1 Retro High OG Chicago Lost and Found (GS) - US4Y.jpg', availableSizes: [7,7.5,8,9,9.5,10] },
  { id: 'dunk-panda', brand: 'Nike', model: 'Dunk Low', colorway: 'Panda', lowestAsk: 6995, lastSale: 6645, highestBid: 6295, changeAbs: -226, changePct: -3.0, releaseDate: '2021-03-10', retail: 6215, sku: 'DD1391-100', hue: 'from-zinc-200 to-white', image: 'Product Images/Nike Women\'s Dunk Low Shoes_Panda Version.jpg', availableSizes: [5,5.5,6,6.5,7] },
  { id: 'yeezy-zebra', brand: 'Adidas', model: 'Yeezy Boost 350 V2', colorway: 'Zebra', lowestAsk: 19995, lastSale: 18995, highestBid: 17995, changeAbs: 452, changePct: 3.1, releaseDate: '2017-02-25', retail: 12430, sku: 'CP9654', hue: 'from-amber-100 to-white', image: 'Product Images/Yeezy Shoes _ Yeezy Boost Zebra 350 V2 Size 4 _ Color_ Black_White _ Size_ 4.jpg', availableSizes: [8,8.5,9,10,11] },
  { id: 'nb-550', brand: 'New Balance', model: '550', colorway: 'White Green', lowestAsk: 7495, lastSale: 7120, highestBid: 6750, changeAbs: 283, changePct: 3.6, releaseDate: '2020-09-19', retail: 6215, sku: 'BB550WT1', hue: 'from-emerald-100 to-white', image: 'Product Images/New Balance - White green.jpg', availableSizes: [8,8.5,9,9.5,10] },
  { id: 'asics-gt2160', brand: 'Asics', model: 'GT-2160', colorway: 'Black/Pure Silver', lowestAsk: 7995, lastSale: 7595, highestBid: 7200, changeAbs: 396, changePct: 4.3, releaseDate: '2024-04-12', retail: 8475, sku: '1203A275', hue: 'from-stone-200 to-white', image: 'Product Images/asics gt 2160 - black pure silver.jpg', availableSizes: [7,7.5,8,8.5] },
  { id: 'aj4-bred', brand: 'Jordan', model: '4 Retro', colorway: 'Bred Reimagined', lowestAsk: 18995, lastSale: 18045, highestBid: 17100, changeAbs: -565, changePct: -2.6, releaseDate: '2024-02-17', retail: 12148, sku: 'FV5029-006', hue: 'from-red-100 to-white', image: 'Product Images/AIR JORDAN 4 Retro Bred Reimagined.jpg', availableSizes: [9,9.5,10,11] },
  { id: 'dunk-unlv', brand: 'Nike', model: 'Dunk Low', colorway: 'UNLV', lowestAsk: 7995, lastSale: 7595, highestBid: 7200, changeAbs: 339, changePct: 3.4, releaseDate: '2021-12-02', retail: 6215, sku: 'DD1391-002', hue: 'from-rose-100 to-white', image: 'Product Images/Nike Women\'s Dunk Low UNLV Satin Grey_Varsity in Red, Size 7_5.jpg', availableSizes: [6,6.5,7,8,8.5] },
  { id: 'samba-og', brand: 'Adidas', model: 'Samba OG', colorway: 'Cloud White', lowestAsk: 7495, lastSale: 7120, highestBid: 6750, changeAbs: 170, changePct: 2.5, releaseDate: '2018-06-01', retail: 5650, sku: 'B75806', hue: 'from-zinc-100 to-white', image: 'Product Images/ADIDAS SAMBA.jpg', availableSizes: [7,8,9] },
  { id: 'nb-9060', brand: 'New Balance', model: '9060', colorway: 'Grey', lowestAsk: 11995, lastSale: 11395, highestBid: 10800, changeAbs: 509, changePct: 4.1, releaseDate: '2022-08-25', retail: 10170, sku: 'U9060GRY', hue: 'from-slate-200 to-white', image: 'Product Images/New Balance 9060 Low Top Sneakers - Grey.jpg', availableSizes: [9,9.5,10,10.5] },
  { id: 'aj1-lost', brand: 'Jordan', model: '1 Retro High OG', colorway: 'Next Chapter', lowestAsk: 14995, lastSale: 14245, highestBid: 13495, changeAbs: 848, changePct: 3.8, releaseDate: '2022-11-25', retail: 10170, sku: 'DZ5485-612', hue: 'from-amber-200 to-white', image: 'Product Images/Air Jordan 1 Next Chapter.jpg', availableSizes: [8,8.5,9,9.5] },
  { id: 'vomero5', brand: 'Nike', model: 'Vomero 5', colorway: 'Cave Stone', lowestAsk: 8995, lastSale: 8545, highestBid: 8100, changeAbs: 226, changePct: 2.6, releaseDate: '2023-09-22', retail: 8475, sku: 'FB9149-001', hue: 'from-neutral-200 to-white', image: 'Product Images/On Sale_ Nike Zoom Vomero 5 _Cave Stone_.jpg', availableSizes: [7,7.5,8,8.5,9] },
  { id: 'kayano14', brand: 'Asics', model: 'Gel-Kayano 14', colorway: 'Birch Silver', lowestAsk: 10995, lastSale: 10445, highestBid: 9900, changeAbs: -170, changePct: -1.9, releaseDate: '2023-02-10', retail: 9040, sku: '1203A412', hue: 'from-sky-100 to-white', image: 'Product Images/Now Available_ ASICS GEL-KAYANO 14 _Birch Silver_.jpg', availableSizes: [8,9,10] },

  { id: 'af1-satin-red', brand: 'Nike', model: 'Air Force 1', colorway: '07 NN', lowestAsk: 10995, lastSale: 10495, highestBid: 9850, changeAbs: 180, changePct: 1.7, releaseDate: '2024-03-10', retail: 10250, sku: 'DX3161-100', womens: true, hue: 'from-rose-100 to-white', image: 'Product Images/07 NN.jpg', availableSizes: [5,5.5,6,6.5,7,7.5] },
  { id: 'dunk-purple-pulse', brand: 'Nike', model: 'Dunk Low', colorway: 'Purple Pulse', lowestAsk: 8495, lastSale: 8195, highestBid: 7800, changeAbs: 125, changePct: 1.5, releaseDate: '2024-01-15', retail: 6495, sku: 'DD1503-500', womens: true, hue: 'from-violet-100 to-white', image: 'Product Images/Purple Pulse.jpg', availableSizes: [5,5.5,6,6.5,7] },
  { id: 'aj1-bred-wmns', brand: 'Jordan', model: '1 Retro High OG', colorway: 'Satin Bred Women\'s', lowestAsk: 9995, lastSale: 9595, highestBid: 9200, changeAbs: 310, changePct: 3.2, releaseDate: '2024-05-03', retail: 10500, sku: 'DZ5485-610', womens: true, hue: 'from-red-100 to-black', image: 'Product Images/Satin Bred.jpg', availableSizes: [5,5.5,6,6.5,7,7.5] },
  { id: 'air-max-97-silver', brand: 'Nike', model: 'Air Max 97', colorway: 'Silver Bullet Women\'s', lowestAsk: 12995, lastSale: 12445, highestBid: 11800, changeAbs: 225, changePct: 1.8, releaseDate: '2023-10-01', retail: 13495, sku: 'FD1876-001', womens: true, hue: 'from-slate-200 to-white', image: 'Product Images/Silver Bullet.jpg', availableSizes: [6,6.5,7,7.5,8] },
  { id: 'blazer-77-pale', brand: 'Nike', model: 'Blazer Mid 77', colorway: 'Pale Pink', lowestAsk: 8695, lastSale: 8395, highestBid: 8000, changeAbs: 210, changePct: 2.6, releaseDate: '2024-04-20', retail: 8395, sku: 'FN5361-600', womens: true, hue: 'from-pink-100 to-white', image: 'Product Images/Pale Pink.jpg', availableSizes: [5,5.5,6,6.5,7,7.5] },
  { id: 'forum-pastel', brand: 'Adidas', model: 'Forum Low', colorway: 'Bold W White', lowestAsk: 7995, lastSale: 7695, highestBid: 7300, changeAbs: 190, changePct: 2.4, releaseDate: '2024-02-28', retail: 8500, sku: 'GX7569', womens: true, hue: 'from-lilac-100 to-white', image: 'Product Images/Bold White.jpg', availableSizes: [5,5.5,6,6.5,7] },
  { id: 'pegasus-40-pink', brand: 'Nike', model: 'Pegasus 40', colorway: 'Pink Glow Women\'s', lowestAsk: 9495, lastSale: 9095, highestBid: 8800, changeAbs: 205, changePct: 2.2, releaseDate: '2024-03-30', retail: 10495, sku: 'FJ3020-601', womens: true, hue: 'from-pink-100 to-white', image: 'Product Images/Pink Glow.jpg', availableSizes: [5,5.5,6,6.5,7,7.5] },
];

// Brand list
const BRANDS = ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Asics'];

// Brand logo paths
const BRAND_LOGOS = {
  Nike: 'Brand Logo Images/NIKE.jpg',
  Jordan: 'Brand Logo Images/JORDAN.jpg',
  Adidas: 'Brand Logo Images/ADIDAS.jpg',
  'New Balance': 'Brand Logo Images/NEW BALANCE.jpg',
  Asics: 'Brand Logo Images/ASICS.jpg',
};

// Available sizes (US Men's)
const SIZES = Array.from({ length: 11 }, (_, i) => 4 + i);

// Size matrix for product page
const sizeMatrix = Array.from({ length: 21 }, (_, i) => 4 + i * 0.5);

// DOM query helpers
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// Debounce helper
const debounce = (fn, ms = 250) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
};

// Number formatter for PHP currency
const fmt = (n) => 
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(Number(n));

// Returns size-specific ask/bid prices for a product
const getSizePrice = (s, size) => {
  const defaultSize = Number(size) || (Array.isArray(s.availableSizes) ? Number(s.availableSizes[0]) : 9);
  const offset = defaultSize - 9;
  const ask = Number(s.lowestAsk) + Math.round(offset * 282.5);
  const bid = Number(s.highestBid) + Math.round(offset * 210);
  return {
    ask: Math.max(0, ask),
    bid: Math.max(0, bid),
  };
};

// Generate SVG or image display for sneaker
const sneakerSVG = (hue, img) => {
  if (img) {
    return `<div class="relative w-full aspect-square overflow-hidden bg-cover bg-center" style="background-image:url(&quot;${img}&quot;)"></div>`;
  }
  return `
    <div class="relative w-full aspect-square overflow-hidden bg-gradient-to-br ${hue}">
      <svg viewBox="0 0 200 120" class="absolute inset-0 m-auto w-3/4 h-3/4" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 90 Q 30 60 70 65 L 110 50 Q 140 45 165 65 L 185 75 Q 195 80 192 95 L 188 100 L 15 100 Q 5 100 10 90 Z" fill="#0f0f0f"/>
        <path d="M70 65 L 75 80 M 90 60 L 95 80 M 110 50 L 115 78" stroke="white" stroke-width="2" fill="none"/>
        <ellipse cx="160" cy="85" rx="18" ry="6" fill="white" opacity="0.6"/>
      </svg>
    </div>`;
};

// Generate product card HTML
const card = (s) => {
  const up = s.changeAbs >= 0;
  return `
    <a href="#" data-nav="product" data-id="${s.id}" class="group block border border-line rounded-md overflow-hidden bg-white hover:shadow-lg transition-all hover:-translate-y-0.5">
      ${sneakerSVG(s.hue, s.image)}
      <div class="p-4 border-t border-line">
        <div class="text-[11px] uppercase tracking-wider text-muted">${s.brand}</div>
        <div class="font-semibold text-sm leading-tight mt-0.5 line-clamp-2 min-h-[2.5rem]">${s.model} '${s.colorway}'</div>
        <div class="mt-3 flex items-end justify-between">
          <div>
            <div class="text-[10px] uppercase tracking-wider text-muted">Lowest Ask</div>
            <div class="text-lg font-bold">${fmt(s.lowestAsk)}</div>
          </div>
          <div class="text-xs font-semibold ${up ? 'text-up' : 'text-down'}">${up ? '▲' : '▼'} ${fmt(Math.abs(s.changeAbs))} (${up ? '+' : ''}${s.changePct}%)</div>
        </div>
        <div class="mt-2 text-[11px] text-muted">Last Sale: <span class="text-ink font-medium">${fmt(s.lastSale)}</span></div>
      </div>
    </a>`;
};

// Create form field HTML
const field = (label, type, ph) => {
  return `<label class="block">
    <span class="text-xs font-semibold uppercase tracking-wider text-muted">${label}</span>
    <input type="${type}" placeholder="${ph}" required class="mt-1.5 w-full h-11 px-3 rounded-md border border-line bg-white outline-none focus:border-ink transition text-sm"/>
  </label>`;
};

// Accordion component helper
const accordion = (title, content, openByDefault = true) => {
  return `
    <div class="border-b border-line py-4">
      <button type="button" class="w-full flex items-center justify-between text-sm font-semibold acc-trigger">
        ${title}
        <svg class="h-4 w-4 transition-transform ${openByDefault ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="acc-body mt-3 space-y-2 ${openByDefault ? '' : 'hide'}">${content}</div>
    </div>`;
};

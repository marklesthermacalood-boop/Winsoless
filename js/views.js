// Global state for featured product
let featuredIndex = 0;
let featuredRotateTimer;
const featuredProduct = () => SNEAKERS[featuredIndex] || SNEAKERS[0];



// Featured product panel display
const featuredProductPanel = (s) => {
  const up = s.changeAbs >= 0;
  return `
    <a href="#" data-nav="product" data-id="${s.id}" class="block group">
      <div class="relative aspect-square rounded-2xl bg-gradient-to-br from-red-200 via-amber-100 to-white border border-line overflow-hidden group-hover:shadow-lg transition-shadow">
        ${sneakerSVG(s.hue, s.image)}
        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-md px-3 py-2 text-xs font-semibold border border-line">
          <div class="text-muted text-[10px] uppercase">Lowest Ask</div>
          <div class="text-base font-semibold">${fmt(s.lowestAsk)}</div>
        </div>
        <div class="absolute bottom-4 right-4 bg-ink text-white rounded-md px-3 py-2 text-xs font-semibold">${up ? '▲' : '▼'} ${s.changePct}% Today</div>
      </div>
      <div class="mt-4 text-sm text-muted">
        <div class="font-bold text-lg text-ink">${s.brand} ${s.model}</div>
        <div class="mt-1">${s.colorway}</div>
      </div>
    </a>`;
};



// Browse state
const browseState = { brands: new Set(), sizes: new Set(), womens: false, maxPrice: 70000, sort: 'popular', search: '' };



// Product state
let productState = { id: null, size: null };



// Views object containing all page templates
const views = {};



// Home view
views.home = () => `
  <section class="border-b border-line bg-gradient-to-br from-soft via-white to-soft">
    <div class="mx-auto max-w-7xl px-4 py-10 md:py-16 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
      <div>
        <div class="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-bid uppercase mb-4">
          <span class="w-8 h-px bg-bid"></span> Live Marketplace
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
          Buy & Sell<br/>Authentic<br/><span class="text-bid">Deadstock</span> Sneakers.
        </h1>
        <p class="mt-6 text-muted max-w-md">Live bids, asks, and last sales on every silhouette. 100% verified by Win Soles authenticators before shipping.</p>
        <div class="mt-8 flex flex-wrap gap-3">
        </div>
        <div class="mt-3 grid grid-cols-3 gap-6 max-w-md">
          ${[['10K+', 'Listings'], ['98%', 'Auth Rate'], ['48hr', 'Shipping']].map(([n, l]) => `<div><div class="text-2xl font-black">${n}</div><div class="text-[11px] uppercase tracking-wider text-muted">${l}</div></div>`).join('')}
        </div>
      </div>
      <div id="featured-panel">
        ${featuredProductPanel(featuredProduct())}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16">
    <div class="flex items-end justify-between mb-6">
      <h2 class="text-2xl md:text-3xl font-black">Popular Brands</h2>
      <a href="#" data-nav="browse" class="text-sm font-semibold hover:text-bid">View all →</a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      ${BRANDS.map(b => `<a href="#" data-nav="browse" class="flex flex-col items-center gap-3 rounded-3xl border border-line p-4 text-center transition hover:shadow-lg hover:-translate-y-0.5 duration-200">
          <div class="flex h-20 w-20 items-center justify-center rounded-3xl p-3 overflow-hidden bg-transparent">
            <img src="${BRAND_LOGOS[b]}" alt="${b} logo" class="max-h-full max-w-full object-contain" />
          </div>
          <div class="text-sm font-semibold text-ink">${b}</div>
        </a>`).join('')}
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 pb-16">
    <div class="flex items-end justify-between mb-6">
      <div>
        <div class="text-xs uppercase tracking-widest text-bid font-semibold">Trending Now</div>
        <h2 class="text-2xl md:text-3xl font-black mt-1">Top Selling</h2>
      </div>
      <a href="#" data-nav="browse" class="text-sm font-semibold hover:text-bid">See more →</a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">${SNEAKERS.slice(0, 8).map(card).join('')}</div>
  </section>

  <section class="mx-auto max-w-7xl px-4 pb-16">
    <h2 class="text-2xl md:text-3xl font-black mb-6">Recommended for You</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">${SNEAKERS.slice(8, 12).map(card).join('')}</div>
  </section>
`;



// About view
views.about = () => `
  <div class="mx-auto max-w-7xl px-4 py-16">
    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div class="text-xs uppercase tracking-widest text-bid font-semibold mb-3">About Win Soles</div>
        <h1 class="text-4xl font-black leading-tight">We built Win Soles for collectors, by collectors.</h1>
        <p class="mt-4 text-muted max-w-xl">Our mission is to make buying and selling verified deadstock sneakers safe, simple, and transparent. Every pair passes a thorough authentication process by our expert team.</p>
        <div class="mt-6 flex gap-3">
          <a href="#" data-nav="browse" class="h-12 px-6 inline-flex items-center rounded-md border border-ink font-semibold">Shop Sneakers</a>
          <a href="#" data-nav="sell" class="h-12 px-6 inline-flex items-center rounded-md bg-ink text-white font-semibold">Sell Your Pair</a>
        </div>
      </div>
      <div class="space-y-4">
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line">
          <img src="/Posters/AboutUsPoster.jpg" alt="Win Soles poster" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute left-6 bottom-6 text-white">
            <div class="text-5xl font-black leading-none">10K+</div>
            <div class="text-sm uppercase tracking-widest">Active Listings</div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center">
            <div class="font-black text-lg">98%</div>
            <div class="text-xs text-muted">Auth Rate</div>
          </div>
          <div class="text-center">
            <div class="font-black text-lg">48hr</div>
            <div class="text-xs text-muted">Avg Shipping</div>
          </div>
          <div class="text-center">
            <div class="font-black text-lg">Global</div>
            <div class="text-xs text-muted">Buyers & Sellers</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="text-2xl font-black">Our Team</h2>
      <p class="text-sm text-muted mt-1">A small group of entrepreneurs, builders, and sneakerheads based around the Philippines.</p>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="border border-line rounded-md p-4 text-center">
          <div class="font-bold">Harvey Dangate</div>
          <div class="text-xs text-muted">Founder</div>
        </div>
        <div class="border border-line rounded-md p-4 text-center">
          <div class="font-bold">Mark Macalood</div>
          <div class="text-xs text-muted">Co-Founder</div>
        </div>
        <div class="border border-line rounded-md p-4 text-center">
          <div class="font-bold">Jefferson David</div>
          <div class="text-xs text-muted">Shareholder</div>
        </div>
        <div class="border border-line rounded-md p-4 text-center">
          <div class="font-bold">Lance Llaguno</div>
          <div class="text-xs text-muted">Shareholder</div>
        </div>
      </div>
    </div>

    <div class="mt-12 grid md:grid-cols-2 gap-6 items-start">
      <div>
        <h3 class="font-bold">Careers</h3>
        <p class="text-sm text-muted mt-1">We're hiring authenticators and ops specialists. <a href="#" data-nav="signup" class="font-semibold text-ink hover:text-bid">Create an account</a> to get updates.</p>
      </div>
      <div>
        <h3 class="font-bold">Contact</h3>
        <p class="text-sm text-muted mt-1">For press or partnerships email <a href="mailto:winsoles@gmail.com" class="text-ink font-semibold">winsoles@gmail.com</a>.</p>
      </div>
    </div>
  </div>
`;



// Browse view
views.browse = () => `
  <div class="mx-auto max-w-7xl w-full px-4 py-2">
    <div class="mb-1">
      <h1 class="text-3xl md:text-4xl font-black">All Sneakers</h1>
      <p class="text-sm text-muted mt-1">Live market data updated every minute</p>
    </div>
    <div class="grid lg:grid-cols-[260px_1fr] gap-2">
      <aside class="hidden lg:block" id="filters-desktop">${renderFilters()}</aside>
      <div>
        <div class="flex items-center justify-between mb-2 pb-1 border-b border-line">
          <div class="text-sm text-muted"><span class="font-bold text-ink" id="count">${SNEAKERS.length}</span> results</div>
          <div class="flex items-center gap-2">
            <button id="mobile-filters" class="lg:hidden h-9 px-3 inline-flex items-center gap-2 border border-line rounded-md text-sm">Filters</button>
            <select id="sort" class="h-9 pl-3 border border-line rounded-md text-sm font-medium bg-white cursor-pointer">
              <option value="popular">Most Popular</option>
              <option value="low">Lowest Ask</option>
              <option value="high">Highest Bid</option>
              <option value="new">Newest Releases</option>
            </select>
          </div>
        </div>
        <div id="grid" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </div>
    </div>
  </div>
  <div id="filter-drawer" class="hide lg:hidden fixed inset-0 z-50 bg-black/40">
    <div class="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-5 overflow-y-auto" onclick="event.stopPropagation()">
      <div class="flex justify-between items-center mb-4">
        <div class="font-bold">Filters</div>
        <button id="close-drawer" class="text-sm font-semibold">Done</button>
      </div>
      <div id="filters-mobile">${renderFilters()}</div>
    </div>
  </div>
`;



// Product view
views.product = () => {
  const s = SNEAKERS.find(x => x.id === productState.id) || SNEAKERS[0];
  const up = s.changeAbs >= 0;
  const selectedSize = productState.size || (s.availableSizes && s.availableSizes[0]);
  const sizePrices = getSizePrice(s, selectedSize);
  return `
    <div class="mx-auto max-w-7xl w-full px-4 py-6">
      <nav class="text-xs text-muted flex items-center gap-1.5 mb-6">
        <a href="#" data-nav="home" class="hover:text-ink">Home</a> ›
        <a href="#" data-nav="browse" class="hover:text-ink">Browse</a> ›
        <span class="text-ink">${s.model}</span>
      </nav>
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <div class="relative border border-line rounded-md overflow-hidden">
            ${sneakerSVG(s.hue, s.image)}
            <div class="absolute top-4 left-4 bg-ink text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
              ✓ Condition: 100% Brand New
            </div>
          </div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-widest text-muted font-semibold">${s.brand}</div>
          <h1 class="text-3xl md:text-4xl font-black tracking-tight mt-1 leading-tight">${s.model}</h1>
          <div class="text-lg text-muted">'${s.colorway}'</div>

          <div class="mt-6 flex items-center gap-6 pb-6 border-b border-line">
            <div>
              <div class="text-[11px] uppercase tracking-wider text-muted">Last Sale</div>
              <div class="text-xl font-bold">${fmt(s.lastSale)}</div>
            </div>
            <div class="text-sm font-semibold ${up ? 'text-up' : 'text-down'}">${up ? '▲' : '▼'} ${fmt(Math.abs(s.changeAbs))} (${up ? '+' : ''}${s.changePct}%)</div>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between mb-3">
              <div class="text-sm font-semibold">Select Size <span class="text-muted font-normal">— US Men's</span></div>
              <button class="text-xs underline text-muted">Size Guide</button>
            </div>
            <div class="grid grid-cols-5 gap-2" id="size-grid">
              ${sizeMatrix.map(sz => {
                const price = getSizePrice(s, sz).ask;
                return `
                <button ${s.availableSizes && !s.availableSizes.includes(sz) ? 'disabled title="Out of stock"' : ''} data-size="${sz}" class="h-12 rounded-md border text-sm font-semibold flex flex-col items-center justify-center transition ${s.availableSizes && !s.availableSizes.includes(sz) ? 'border-line bg-soft text-muted opacity-50 cursor-not-allowed' : (selectedSize == sz ? 'bg-ink text-white border-ink' : 'border-line hover:border-ink')}">
                  <span>${sz}</span>
                  <span class="text-[9px] opacity-70">${fmt(price)}</span>
                </button>`;
              }).join('')}
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button data-nav="checkout" data-id="${s.id}" class="h-16 rounded-md bg-ask text-white font-bold flex flex-col items-center justify-center hover:opacity-95">
              <span class="text-base">Buy Now</span>
              <span class="text-xs opacity-90" id="buy-now-tag">${fmt(sizePrices.ask)} lowest ask</span>
            </button>
            
            <button data-nav="bid" data-id="${s.id}" class="h-16 rounded-md bg-bid text-white font-bold flex flex-col items-center justify-center hover:opacity-95">
              <span class="text-base">Place Bid</span>
              <span class="text-xs opacity-90" id="bid-tag">${fmt(sizePrices.bid)} highest offer</span>
            </button>
          </div>
          <div class="mt-3 text-sm text-muted" id="selected-size-label">Selected size: ${selectedSize}</div>

          <div class="mt-8 border-t border-line pt-6">
            <h2 class="font-bold mb-3">Product Details</h2>
            <dl class="grid grid-cols-2 gap-y-3 text-sm">
              ${[['Brand', s.brand], ['Colorway', s.colorway], ['Style', s.sku], ['Retail Price', fmt(s.retail)], ['Release Date', s.releaseDate], ['Condition', 'Deadstock']]
                .map(([k, v]) => `<div><dt class="text-muted text-xs uppercase tracking-wider">${k}</dt><dd class="font-semibold">${v}</dd></div>`).join('')}
            </dl>
            <div class="mt-6 p-4 bg-soft rounded-md flex gap-3 text-sm">
              <span class="text-ask text-lg">🛡</span>
              <div>
                <div class="font-semibold">Win Soles Authenticity Guarantee</div>
                <p class="text-muted text-xs mt-1">Every pair is verified by our expert authenticators before shipping. If it's not 100% authentic deadstock, you get a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};



// Auth view
const authView = (mode) => {
  const isSignup = mode === 'signup';
  return `
    <div class="grid lg:grid-cols-2 min-h-[calc(100vh-100px)]">
      <div class="relative hidden lg:flex flex-col justify-between p-12 bg-ink text-white overflow-hidden">
        <div class="text-2xl font-black">WIN<span class="text-bid">SOLES</span></div>
        <div>
          <div class="text-xs uppercase tracking-widest text-bid font-semibold mb-3">Join the Marketplace</div>
          <h2 class="text-4xl font-black leading-tight">The world's most trusted home for deadstock sneakers.</h2>
          <p class="mt-4 text-white/70 max-w-md">Track live bids and asks. Get notified on drops. Sell to a global audience — all verified by Win Soles.</p>
        </div>
        <div class="grid grid-cols-3 gap-6 text-sm">
          <div><div class="text-2xl font-black">12K+</div><div class="text-white/60 text-[11px] uppercase tracking-wider">Listings</div></div>
          <div><div class="text-2xl font-black">98%</div><div class="text-white/60 text-[11px] uppercase tracking-wider">Auth Rate</div></div>
          <div><div class="text-2xl font-black">48hr</div><div class="text-white/60 text-[11px] uppercase tracking-wider">Shipping</div></div>
        </div>
        <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-bid/30 blur-3xl"></div>
      </div>
      <div class="flex items-center justify-center p-8">
        <form id="auth-form" class="w-full max-w-md">
          <h1 class="text-3xl font-black tracking-tight">${isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p class="text-sm text-muted mt-1">${isSignup ? 'Start buying and selling deadstock today.' : 'Login to track bids, asks, and orders.'}</p>
          <div class="mt-8 space-y-4">
            ${isSignup ? field('Username', 'text', 'Juan Dela Cruz') : ''}
            ${field('Email', 'email', 'juan@google.com')}
            ${field('Password', 'password', '••••••••')}
            ${isSignup ? field('Confirm Password', 'password', '••••••••') : ''}
          </div>
          <button type="submit" class="mt-6 w-full h-12 rounded-md bg-ink text-white font-bold hover:opacity-90">${isSignup ? 'Create Account' : 'Login'}</button>
          <div class="my-6 flex items-center gap-3 text-xs text-muted"><div class="h-px flex-1 bg-line"></div>OR<div class="h-px flex-1 bg-line"></div></div>
          <button type="button" class="w-full h-11 rounded-md border border-line font-semibold text-sm hover:bg-soft">Continue with Google</button>
          <p class="mt-6 text-sm text-center text-muted">
            ${isSignup ? 'Already a member? ' : 'New to Win Soles? '}
            <a href="#" data-nav="${isSignup ? 'login' : 'signup'}" class="font-semibold text-ink hover:text-bid">${isSignup ? 'Login' : 'Sign up'}</a>
          </p>
        </form>
      </div>
    </div>`;
};

views.login = () => authView('login');
views.signup = () => authView('signup');



// Account view
views.account = () => {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!user) {
    return `
      <div class="mx-auto max-w-md p-8 text-center">
        <h2 class="text-2xl font-black">Account</h2>
        <p class="mt-4 text-muted">You must be logged in to view your account.</p>
        <div class="mt-6">
          <a href="#" data-nav="login" class="inline-block h-11 px-6 rounded-md bg-ink text-white font-semibold">Login</a>
        </div>
      </div>`;
  }

  const initials = user.username.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  const orders = typeof getOrdersForUser === 'function' ? getOrdersForUser(user.email) : [];
  const listings = typeof getUserListings === 'function' ? getUserListings(user.email) : [];
  const bids = typeof getBidsForUser === 'function' ? getBidsForUser(user.email) : [];
  const orderHistory = orders.length > 0
    ? orders
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((o) => `
          <div class="p-4 border border-line rounded-md mb-3">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <div class="font-semibold">Order #${o.id}</div>
                <div class="text-sm text-muted mt-1">${new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div class="text-sm font-semibold uppercase ${o.status === 'Pending' ? 'text-bid' : 'text-ink'}">${o.status}</div>
            </div>
            <div class="mt-3 text-sm text-muted">${o.name || 'No name provided'} • ${o.paymentMethod || 'Payment info unavailable'}</div>
            <div class="mt-2 text-sm">Total: <strong>${typeof fmt === 'function' ? fmt(o.price) : o.price}</strong></div>
          </div>`)
        .join('')
    : `<p class="text-sm text-muted mt-2">No orders yet — when you purchase, they'll appear here.</p>`;
  const listingHistory = listings.length > 0
    ? listings
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((l) => `
          <div class="p-4 border border-line rounded-md mb-3">
            <div class="flex items-center justify-between gap-3">
              <div>
                <div class="font-semibold">${l.title}</div>
                <div class="text-sm text-muted mt-1">Size ${l.size}${l.sku ? ` • ${l.sku}` : ''}</div>
              </div>
              <div class="text-sm font-semibold uppercase ${l.status === 'Pending' ? 'text-bid' : 'text-ink'}">${l.status}</div>
            </div>
            <div class="mt-3 text-sm">Ask: <strong>${typeof fmt === 'function' ? fmt(l.ask) : l.ask}</strong></div>
          </div>`)
        .join('')
    : `<p class="text-sm text-muted mt-2">No listings yet — when you submit, they'll appear here.</p>`;
  const bidHistory = bids.length > 0
    ? bids
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((b) => `
          <div class="p-4 border border-line rounded-md mb-3">
            <div class="flex items-center justify-between gap-3">
              <div>
                <div class="font-semibold">Bid #${b.id}</div>
                <div class="text-sm text-muted mt-1">${new Date(b.createdAt).toLocaleString()}</div>
              </div>
              <div class="text-sm font-semibold uppercase ${b.status === 'Pending' ? 'text-bid' : 'text-ink'}">${b.status}</div>
            </div>
            <div class="mt-3 text-sm text-muted">Size ${b.size || 'N/A'} • ${b.note || 'No message provided'}</div>
            <div class="mt-2 text-sm">Bid: <strong>${typeof fmt === 'function' ? fmt(b.price) : b.price}</strong></div>
          </div>`)
        .join('')
    : `<p class="text-sm text-muted mt-2">No bids yet — when you place one, it'll appear here.</p>`;

  return `
    <div class="mx-auto max-w-4xl px-4 py-12">
      <div class="grid md:grid-cols-3 gap-8 items-start">
        <div class="col-span-1 flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-full bg-line flex items-center justify-center text-2xl font-bold text-ink">${initials}</div>
          <div class="mt-4 font-bold text-xl">${user.username}</div>
          <div class="text-sm text-muted mt-1">${user.email}</div>
          <button id="account-logout" class="mt-6 h-11 px-6 rounded-md bg-ink text-white font-semibold">Logout</button>
        </div>
        <div class="md:col-span-2">
          <h3 class="text-lg font-bold">Account Details</h3>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div class="p-4 border border-line rounded-md">
              <div class="text-xs text-muted">Username</div>
              <div class="font-semibold mt-1">${user.username}</div>
            </div>
            <div class="p-4 border border-line rounded-md">
              <div class="text-xs text-muted">Email</div>
              <div class="font-semibold mt-1">${user.email}</div>
            </div>
          </div>
          <div class="mt-6">
            <h4 class="text-sm font-bold">Order History</h4>
            <div class="mt-3">${orderHistory}</div>
          </div>
          <div class="mt-6">
            <h4 class="text-sm font-bold">Listing History</h4>
            <div class="mt-3">${listingHistory}</div>
          </div>
          <div class="mt-6">
            <h4 class="text-sm font-bold">Bid History</h4>
            <div class="mt-3">${bidHistory}</div>
          </div>
        </div>
      </div>
    </div>`;
};



// Sell view
views.sell = () => {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const isLoggedIn = Boolean(user);
  const pendingCount = isLoggedIn && typeof getUserListings === 'function' ? getUserListings(user.email).filter((item) => item.status === 'Pending').length : 0;

  if (!isLoggedIn) {
    return `
      <div class="mx-auto max-w-4xl w-full px-4 py-16 text-center">
        <div class="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-bid uppercase mb-4">
          <span class="w-8 h-px bg-bid"></span> Ready to Sell
        </div>
        <h1 class="text-4xl md:text-5xl font-black">List your sneakers in minutes.</h1>
        <p class="mt-4 text-muted max-w-xl mx-auto">Login or create an account to submit a new listing and get your pair pending review.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#" data-nav="login" class="h-12 px-7 inline-flex items-center rounded-md bg-ink text-white font-semibold">Login</a>
          <a href="#" data-nav="signup" class="h-12 px-7 inline-flex items-center rounded-md border border-ink font-semibold">Sign Up</a>
        </div>
      </div>`;
  }

  return `
    <div class="mx-auto max-w-4xl w-full px-4 py-16">
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-bid uppercase mb-4">
          <span class="w-8 h-px bg-bid"></span> Seller Listing
        </div>
        <h1 class="text-4xl md:text-5xl font-black">Create your listing</h1>
        <p class="mt-4 text-muted max-w-2xl mx-auto">Submit your pair, set an ask price, and we’ll mark it as pending review.</p>
        <div class="mt-4 text-sm text-muted">You have <strong>${pendingCount}</strong> pending listing${pendingCount === 1 ? '' : 's'}.</div>
      </div>
      <form id="sell-form" class="grid gap-6">
        <div class="grid md:grid-cols-2 gap-4">
          <label class="block">
            <div class="text-sm font-semibold text-ink">Shoe Title</div>
            <input name="title" required placeholder="Air Jordan 1 Chicago" class="mt-2 w-full h-12 rounded-md border border-line px-3" />
          </label>
          <label class="block">
            <div class="text-sm font-semibold text-ink">Size</div>
            <input name="size" required placeholder="10" class="mt-2 w-full h-12 rounded-md border border-line px-3" />
          </label>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <label class="block">
            <div class="text-sm font-semibold text-ink">SKU (optional)</div>
            <input name="sku" placeholder="AJ1-555088-101" class="mt-2 w-full h-12 rounded-md border border-line px-3" />
          </label>
          <label class="block">
            <div class="text-sm font-semibold text-ink">Ask Price</div>
            <input name="ask" required type="number" min="0" placeholder="6995" class="mt-2 w-full h-12 rounded-md border border-line px-3" />
          </label>
        </div>

        <label class="block">
          <div class="text-sm font-semibold text-ink">Notes</div>
          <textarea name="notes" rows="4" placeholder="Condition, packaging, authenticity notes" class="mt-2 w-full rounded-md border border-line px-3 py-3"></textarea>
        </label>

        <div id="sell-error" class="hide text-sm text-red-600"></div>
        <button type="submit" class="h-12 rounded-md bg-ink text-white font-semibold">Submit Listing</button>
      </form>
    </div>`;
};


views['listing-success'] = (params = {}) => `
  <div class="mx-auto max-w-3xl px-4 py-20 text-center">
    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ask text-white text-2xl font-bold mx-auto">✓</div>
    <h1 class="text-3xl font-black mt-6">Listing in process</h1>
    <p class="mt-4 text-muted max-w-xl mx-auto">${params.title ? `Your listing for <strong>${params.title}</strong> is now pending review.` : 'Your listing is now pending review.'}</p>
    <p class="mt-2 text-sm text-muted">We’ll notify you once it is approved and live on the marketplace.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <a href="#" data-nav="sell" class="h-12 px-6 inline-flex items-center rounded-md bg-ink text-white font-semibold">List another shoe</a>
      <a href="#" data-nav="account" class="h-12 px-6 inline-flex items-center rounded-md border border-ink font-semibold">View Account</a>
    </div>
  </div>`;


// Checkout view
views.checkout = (params = {}) => {
  const id = params.id || productState.id;
  const s = SNEAKERS.find(x => x.id === id) || SNEAKERS[0];
  const selectedSize = productState.size || (s.availableSizes && s.availableSizes[0]);
  const sizePrices = getSizePrice(s, selectedSize);
  const price = sizePrices.ask;
  return `
    <div class="mx-auto max-w-3xl px-4 py-12">
      <h2 class="text-2xl font-black">Checkout</h2>
      <p class="text-sm text-muted mt-1">Complete your purchase for <strong>${s.brand} ${s.model} — ${s.colorway}</strong></p>
      <div class="mt-6 grid md:grid-cols-2 gap-6">
        <div class="p-4 border border-line rounded-md">
          <div id="checkout-error" class="hide mb-3 text-sm text-white bg-down p-3 rounded-md"></div>
          <div class="text-sm text-muted">Shipping To</div>
          <input id="checkout-name" required placeholder="Full name" class="mt-2 w-full h-11 px-3 rounded-md border border-line" />
          <input id="checkout-address" required placeholder="Shipping address" class="mt-2 w-full h-11 px-3 rounded-md border border-line" />
          <div class="text-sm text-muted mt-3">Payment Method</div>
          <div class="mt-2 space-y-2">
            <label class="flex items-center gap-3"><input type="radio" name="payment" value="card" checked /> Credit / Debit Card</label>
            <label class="flex items-center gap-3"><input type="radio" name="payment" value="gcash" /> GCash</label>
            <label class="flex items-center gap-3"><input type="radio" name="payment" value="paypal" /> PayPal</label>
            <label class="flex items-center gap-3"><input type="radio" name="payment" value="cod" /> Cash on Delivery</label>
          </div>
          <div id="card-fields" class="mt-3">
            <input id="card-number" placeholder="Card number" class="mt-2 w-full h-11 px-3 rounded-md border border-line" />
            <div class="mt-2 grid grid-cols-2 gap-2">
              <input id="card-exp" placeholder="MM/YY" class="h-11 px-3 rounded-md border border-line" />
              <input id="card-cvc" placeholder="CVC" class="h-11 px-3 rounded-md border border-line" />
            </div>
          </div>
        </div>
        <div class="p-4 border border-line rounded-md">
          <div class="text-sm text-muted">Order Summary</div>
          <div class="mt-3">
            <div class="flex items-center justify-between"><div class="text-sm">${s.brand} ${s.model} — ${s.colorway}</div><div class="font-semibold">${fmt(price)}</div></div>
            <div class="flex items-center justify-between mt-2"><div class="text-sm text-muted">Shipping</div><div class="font-semibold">Free</div></div>
            <div class="flex items-center justify-between mt-4 text-lg font-bold"><div>Total</div><div>${fmt(price)}</div></div>
          </div>
          <form id="checkout-form" class="mt-6">
            <input type="hidden" name="productId" value="${s.id}" />
            <input type="hidden" name="price" value="${price}" />
            <input type="hidden" name="size" value="${selectedSize}" />
            <button id="place-order-btn" type="submit" disabled class="w-full h-12 rounded-md bg-ink text-white font-bold opacity-60">Place Order</button>
          </form>
        </div>
      </div>
    </div>`;
};



views.bid = (params = {}) => {
  const id = params.id || productState.id;
  const s = SNEAKERS.find(x => x.id === id) || SNEAKERS[0];
  const selectedSize = productState.size || '';
  const sizePrices = selectedSize ? getSizePrice(s, selectedSize) : getSizePrice(s, s.availableSizes && s.availableSizes[0]);
  const sizeDisplay = selectedSize ? `Size ${selectedSize}` : 'No size selected yet';
  const sizeWarning = selectedSize ? '' : '<div class="mt-4 text-sm text-red-600">Please select a size on the product page before placing your bid.</div>';
  return `
    <div class="mx-auto max-w-3xl px-4 py-12">
      <h2 class="text-2xl font-black">Place a Bid</h2>
      <p class="text-sm text-muted mt-1">Submit an offer for <strong>${s.brand} ${s.model} — ${s.colorway}</strong>.</p>
      <div class="mt-6 grid md:grid-cols-2 gap-6">
        <div class="p-4 border border-line rounded-md">
          <div class="text-sm text-muted">Lowest ask for this size</div>
          <div class="mt-3 text-2xl font-black">${fmt(sizePrices.ask)}</div>
          <div class="text-sm text-muted mt-4">Highest offer for this size</div>
          <div class="mt-3 text-2xl font-black">${fmt(sizePrices.bid)}</div>
          <div class="mt-3 text-sm text-muted">${sizeDisplay}</div>
          ${sizeWarning}
          <div class="mt-6 text-sm text-muted">Enter the amount you want to bid and add any details for the seller.</div>
        </div>
        <div class="p-4 border border-line rounded-md">
          <form id="bid-form" class="space-y-4">
            <input type="hidden" name="productId" value="${s.id}" />
            <input type="hidden" name="currentHighest" value="${sizePrices.bid}" />
            <input type="hidden" name="size" value="${selectedSize}" />
            <label class="block">
              <div class="text-sm font-semibold text-ink">Bid Amount</div>
              <input id="bid-amount" type="number" min="1" placeholder="Enter your offer" class="mt-2 w-full h-12 rounded-md border border-line px-3" />
            </label>
            <label class="block">
              <div class="text-sm font-semibold text-ink">Offer Details</div>
              <textarea id="bid-note" rows="4" placeholder="Why this pair is a great fit, delivery preferences, or condition notes" class="mt-2 w-full rounded-md border border-line px-3 py-3"></textarea>
            </label>
            <div id="bid-error" class="hide text-sm text-red-600"></div>
            <button id="place-bid-btn" type="submit" disabled class="w-full h-12 rounded-md bg-bid text-white font-bold opacity-60">Confirm Bid</button>
          </form>
        </div>
      </div>
    </div>`;
};


views['bid-success'] = (params = {}) => {
  const id = params.id;
  const bid = (typeof getBid === 'function' && id) ? getBid(id) : null;
  return `
    <div class="mx-auto max-w-3xl px-4 py-12 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bid text-white text-2xl font-bold mx-auto">✓</div>
      <h2 class="text-2xl font-black mt-4">${bid && bid.status === 'Won' ? 'Congratulations!' : 'Bid Submitted'}</h2>
      <p class="text-sm text-muted mt-2">${bid ? (bid.status === 'Won' ? `Your bid for <strong>${fmt(bid.price)}</strong> met the lowest ask and the pair is yours.` : `Your bid for <strong>${fmt(bid.price)}</strong> is pending confirmation.`) : 'Your bid is pending confirmation.'}</p>
      <div class="mt-6">
        <a href="#" data-nav="home" class="inline-flex h-11 items-center justify-center px-6 rounded-md border border-ink font-semibold">Continue Shopping</a>
        <a href="#" data-nav="account" class="inline-flex h-11 items-center justify-center px-6 rounded-md bg-ink text-white font-semibold ml-3">View Account</a>
      </div>
    </div>`;
};


// Order success view
views['order-success'] = (params = {}) => {
  const id = params.id;
  const order = (typeof getOrder === 'function' && id) ? getOrder(id) : null;
  return `
    <div class="mx-auto max-w-3xl px-4 py-12 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ask text-white text-2xl font-bold mx-auto">✓</div>
      <h2 class="text-2xl font-black mt-4">Order Pending</h2>
      <p class="text-sm text-muted mt-2">${order ? `Your order <strong>#${order.id}</strong> is pending confirmation.` : 'Your order is pending confirmation.'}</p>
      <div class="mt-6">
        <a href="#" data-nav="home" class="inline-flex h-11 items-center justify-center px-6 rounded-md border border-ink font-semibold">Continue Shopping</a>
        <a href="#" data-nav="account" class="inline-flex h-11 items-center justify-center px-6 rounded-md bg-ink text-white font-semibold ml-3">View Account</a>
      </div>
    </div>`;
};

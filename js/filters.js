// Render filter UI
function renderFilters() {
  const brandList = BRANDS.map(
    (b) =>
      `
    <label class="flex items-center gap-2 text-sm cursor-pointer hover:text-bid">
      <input type="checkbox" data-filter="brand" value="${b}" ${browseState.brands.has(b) ? 'checked' : ''}/> ${b}
    </label>`
  ).join('');

  const sizeBtns = SIZES.map(
    (sz) =>
      `
    <button type="button" data-filter="size" data-value="${sz}" class="h-9 text-xs font-semibold border rounded-md transition ${browseState.sizes.has(sz) ? 'bg-ink text-white border-ink' : 'border-line hover:border-ink'}">${sz}</button>`
  ).join('');

  const price = `
    <input type="range" min="2825" max="70000" value="${browseState.maxPrice}" id="price-range" class="w-full"/>
    <div class="flex justify-between text-xs text-muted"><span>${fmt(2825)}</span><span class="font-semibold text-ink">Up to ${fmt(browseState.maxPrice)}</span><span>${fmt(70000)}</span></div>`;

  const womensFilter = `
    <label class="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" data-filter="womens" ${browseState.womens ? 'checked' : ''} /> Womens
    </label>
    <label class="flex items-center gap-2 text-sm cursor-pointer mt-2">
      <input type="checkbox" data-filter="mens" ${browseState.mens ? 'checked' : ''} /> Mens
    </label>
    <div class="text-xs text-muted mt-3">Show only womens or mens sneakers from the collection. Leaving both unchecked will show all.</div>`;

  return (
    accordion('Brand', brandList) +
    accordion(`US Sizes`, `<div class="grid grid-cols-4 gap-1.5">${sizeBtns}</div>`) +
    accordion('Price Range', price) +
    accordion('Gender', womensFilter, false)
  );
}

// Apply filters to product list
function applyFilters() {
  const q = (browseState.search || '').toLowerCase().trim();
  let r = SNEAKERS.filter(
    (s) =>
      Array.isArray(s.availableSizes) && s.availableSizes.length > 0 &&
      (browseState.brands.size === 0 || browseState.brands.has(s.brand)) &&
      s.lowestAsk <= browseState.maxPrice &&
      (q === '' || [s.brand, s.model, s.colorway, s.sku].join(' ').toLowerCase().includes(q))
  );

  if (browseState.sizes.size > 0) {
    r = r.filter((s) => Array.from(browseState.sizes).some((sz) => s.availableSizes.includes(sz)));
  }

  if (browseState.womens || browseState.mens) {
    if (browseState.womens && !browseState.mens) {
      r = r.filter((s) => s.womens || /women/i.test(`${s.model} ${s.colorway} ${s.image}`));
    } else if (browseState.mens && !browseState.womens) {
      r = r.filter((s) => !s.womens && !/women/i.test(`${s.model} ${s.colorway} ${s.image}`));
    }
  }

  if (browseState.sort === 'low') r.sort((a, b) => a.lowestAsk - b.lowestAsk);
  else if (browseState.sort === 'high') r.sort((a, b) => b.highestBid - a.highestBid);
  else if (browseState.sort === 'new') r.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

  $('#grid').innerHTML = r.length
    ? r.map(card).join('')
    : `<div class="col-span-full text-center py-20 text-muted">No sneakers match your filters.</div>`;
  $('#count').textContent = r.length;
}

// Wire up filter interactions
function wireFilters(scope) {
  // Accordion toggle
  $$('.acc-trigger', scope).forEach((b) =>
    (b.onclick = () => {
      const body = b.nextElementSibling;
      body.classList.toggle('hide');
      b.querySelector('svg').classList.toggle('rotate-180');
    })
  );

  // Brand filter
  $$('input[data-filter="brand"]', scope).forEach(
    (i) =>
      (i.onchange = () => {
        i.checked ? browseState.brands.add(i.value) : browseState.brands.delete(i.value);
        applyFilters();
      })
  );

  // Size filter
  $$('button[data-filter="size"]', scope).forEach(
    (b) =>
      (b.onclick = () => {
        const sz = +b.dataset.value;
        if (browseState.sizes.has(sz)) {
          browseState.sizes.delete(sz);
          b.classList.remove('bg-ink', 'text-white', 'border-ink');
          b.classList.add('border-line');
        } else {
          browseState.sizes.add(sz);
          b.classList.add('bg-ink', 'text-white', 'border-ink');
        }
        applyFilters();
      })
  );

  // Price range filter
  const range = $('#price-range', scope);
  if (range) {
    range.oninput = () => {
      browseState.maxPrice = +range.value;
      applyFilters();
    };
  }

  // Womens filter
  const womensCheck = $('input[data-filter="womens"]', scope);
  if (womensCheck) {
    womensCheck.onchange = () => {
      browseState.womens = womensCheck.checked;
      applyFilters();
    };
  }

  const mensCheck = $('input[data-filter="mens"]', scope);
  if (mensCheck) {
    mensCheck.onchange = () => {
      browseState.mens = mensCheck.checked;
      applyFilters();
    };
  }
}

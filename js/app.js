// Wire search functionality
function wireSearch() {
  const doSearch = (val, hideMobile = false) => {
    browseState.search = (val || '').toLowerCase().trim();
    if (hideMobile) $('#mobile-menu').classList.add('hide');
    navigate('browse');
  };

  const d = $('#search-input');
  if (d) d.oninput = debounce((e) => doSearch(e.target.value), 300);

  const m = $('#mobile-search');
  if (m) m.oninput = debounce((e) => doSearch(e.target.value, true), 300);
}

// Wire product page size selection
function wireProduct() {
  const updatePricing = (size) => {
    const s = SNEAKERS.find(x => x.id === productState.id) || SNEAKERS[0];
    const { ask, bid } = getSizePrice(s, size);
    const buyTag = $('#buy-now-tag');
    const bidTag = $('#bid-tag');
    const sizeLabel = $('#selected-size-label');
    if (buyTag) buyTag.textContent = `${fmt(ask)} lowest ask`;
    if (bidTag) bidTag.textContent = `${fmt(bid)} highest offer`;
    if (sizeLabel) sizeLabel.textContent = `Selected size: ${size}`;
  };

  $$('#size-grid button').forEach((b) => {
    if (b.disabled) return;
    b.onclick = () => {
      productState.size = +b.dataset.size;
      updatePricing(productState.size);
      $$('#size-grid button').forEach((x) => {
        if (x.disabled) return;
        x.className = 'h-12 rounded-md border text-sm font-semibold flex flex-col items-center justify-center transition border-line hover:border-ink';
      });
      b.className = 'h-12 rounded-md border text-sm font-semibold flex flex-col items-center justify-center transition bg-ink text-white border-ink';
    };
  });
}

// Rotate featured product
function wireFeaturedProduct() {
  if (featuredRotateTimer) clearInterval(featuredRotateTimer);
  const panel = $('#featured-panel');
  if (!panel) return;
  featuredRotateTimer = setInterval(() => {
    featuredIndex = (featuredIndex + 1) % SNEAKERS.length;
    panel.innerHTML = featuredProductPanel(featuredProduct());
  }, 4000);
}

// Main navigation and view rendering
function navigate(view, params = {}) {
  if (view === 'product') productState = { id: params.id, size: null };

  const root = $('#app');
  root.classList.remove('fade-in');
  void root.offsetWidth; // Trigger reflow
  root.innerHTML = (views[view] || views.home)(params || {});
  root.classList.add('fade-in');
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('#footer').classList.toggle('hide', view === 'login' || view === 'signup');

  // Setup browse view
  if (view === 'browse') {
    wireFilters($('#filters-desktop'));
    applyFilters();
    $('#sort').onchange = (e) => {
      browseState.sort = e.target.value;
      applyFilters();
    };
    $('#mobile-filters').onclick = () => {
      $('#filter-drawer').classList.remove('hide');
      $('#filters-mobile').innerHTML = renderFilters();
      wireFilters($('#filters-mobile'));
    };
    $('#close-drawer').onclick = () => $('#filter-drawer').classList.add('hide');
    $('#filter-drawer').onclick = () => $('#filter-drawer').classList.add('hide');
  }

  // Setup home view
  if (view === 'home') wireFeaturedProduct();
  else if (featuredRotateTimer) clearInterval(featuredRotateTimer);

  // Setup product view
  if (view === 'product') wireProduct();

  // Setup auth views
  if (view === 'login' || view === 'signup') {
    const form = $('#auth-form');
    const inputs = $$('#auth-form input');
    const button = $('button[type="submit"]', form);
    
    form.onsubmit = (e) => {
      e.preventDefault();
      
      // Clear previous error message if exists
      const existingError = $('.auth-error');
      if (existingError) existingError.remove();
      
      let result;
      
      if (view === 'signup') {
        result = signup(
          inputs[1].value, // email
          inputs[0].value, // username
          inputs[2].value, // password
          inputs[3].value  // confirm password
        );
      } else {
        result = login(
          inputs[0].value, // email
          inputs[1].value  // password
        );
      }
      
      if (result.success) {
        updateAuthUI();
        const successMsg = document.createElement('div');
        successMsg.className = 'auth-success mb-4 p-4 bg-ask text-white rounded-md text-sm font-medium';
        successMsg.textContent = result.message;
        form.insertBefore(successMsg, form.firstChild);
        
        setTimeout(() => {
          navigate('home');
        }, 1500);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error mb-4 p-4 bg-down text-white rounded-md text-sm font-medium';
        errorDiv.textContent = result.message;
        form.insertBefore(errorDiv, form.firstChild);
      }
    };
  }

  // Setup sell view
  if (view === 'sell') {
    const form = $('#sell-form');
    const errorBox = $('#sell-error');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn()) {
          navigate('login');
          return;
        }

        const title = (form.querySelector('[name="title"]') || {}).value.trim();
        const sku = (form.querySelector('[name="sku"]') || {}).value.trim();
        const size = (form.querySelector('[name="size"]') || {}).value.trim();
        const ask = (form.querySelector('[name="ask"]') || {}).value.trim();

        if (!title || !size || !ask) {
          if (errorBox) {
            errorBox.textContent = 'Please complete all required fields before submitting your listing.';
            errorBox.classList.remove('hide');
          }
          return;
        }

        const listing = createListing({
          sellerEmail: getCurrentUser().email,
          title,
          sku,
          size,
          ask,
        });

        navigate('listing-success', { title: listing.title });
      };
    }
  }

  // Setup account view
  if (view === 'account') {
    const btn = $('#account-logout');
    if (btn) btn.onclick = (e) => {
      e.preventDefault();
      logout();
      updateAuthUI();
      navigate('home');
    };
  }

  // Setup bid view
  if (view === 'bid') {
    const form = $('#bid-form');
    const amountInput = $('#bid-amount');
    const noteInput = $('#bid-note');
    const placeBtn = $('#place-bid-btn');
    const errorBox = $('#bid-error');

    const validateBid = () => {
      if (!form || !amountInput || !placeBtn) return false;
      const amount = Number(amountInput.value);
      const currentHighest = Number(form.querySelector('input[name="currentHighest"]').value || 0);
      const size = form.querySelector('input[name="size"]').value;
      const isValid = amount > currentHighest && amount > 0 && Boolean(size);
      placeBtn.disabled = !isValid;
      placeBtn.classList.toggle('opacity-60', !isValid);
      return isValid;
    };

    if (amountInput) amountInput.oninput = validateBid;
    if (noteInput) noteInput.oninput = validateBid;
    validateBid();

    if (form) form.onsubmit = (e) => {
      e.preventDefault();
      if (!isLoggedIn()) {
        alert('Please login or sign up to place a bid.');
        navigate('login');
        return;
      }

      if (!validateBid()) {
        if (errorBox) {
          errorBox.textContent = 'Enter a bid higher than the current highest offer and choose a size first.';
          errorBox.classList.remove('hide');
        }
        return;
      }

      const productId = form.querySelector('input[name="productId"]').value;
      const size = form.querySelector('input[name="size"]').value;
      const currentHighest = Number(form.querySelector('input[name="currentHighest"]').value || 0);
      const amount = Number(amountInput.value);
      const note = (noteInput || {}).value.trim();
      const s = SNEAKERS.find(x => x.id === productId) || SNEAKERS[0];
      const ask = getSizePrice(s, size).ask;

      const bid = createBid({
        user: getCurrentUser(),
        productId,
        size,
        amount,
        note,
        ask,
      });

      if (bid && bid.id) {
        if (errorBox) errorBox.classList.add('hide');
        navigate('bid-success', { id: bid.id });
      } else {
        if (errorBox) {
          errorBox.textContent = 'Could not submit your bid. Please try again.';
          errorBox.classList.remove('hide');
        }
      }
    };
  }

  // Setup checkout view
  if (view === 'checkout') {
    // show/hide card fields based on payment method
    const cardFields = $('#card-fields');
    const toggleCard = (val) => {
      if (!cardFields) return;
      cardFields.style.display = val === 'card' ? 'block' : 'none';
    };
    // wire radios
    $$('#app input[name="payment"]').forEach(r => r.onchange = (e) => toggleCard(e.target.value));

    const form = $('#checkout-form');
    const nameInput = document.getElementById('checkout-name');
    const addrInput = document.getElementById('checkout-address');
    const placeBtn = document.getElementById('place-order-btn');
    const errorBox = document.getElementById('checkout-error');

    const validateForm = () => {
      const valid = (nameInput && nameInput.value.trim() !== '') && (addrInput && addrInput.value.trim() !== '');
      if (placeBtn) {
        placeBtn.disabled = !valid;
        placeBtn.classList.toggle('opacity-60', !valid);
      }
      return valid;
    };

    if (nameInput) nameInput.oninput = validateForm;
    if (addrInput) addrInput.oninput = validateForm;
    // initial validation state
    // prefill name if logged in
    if (isLoggedIn() && nameInput && !nameInput.value) nameInput.value = getCurrentUser().username || '';
    validateForm();
    // set initial card fields visibility
    const checked = document.querySelector('#app input[name="payment"]:checked');
    if (checked) toggleCard(checked.value);

    if (form) form.onsubmit = (e) => {
      e.preventDefault();
      // Ensure user is logged in
      if (!isLoggedIn()) {
        alert('Please login or sign up to place an order.');
        navigate('login');
        return;
      }
      // Validate shipping details
      if (!validateForm()) {
        if (errorBox) {
          errorBox.textContent = 'Please provide your full name and shipping address.';
          errorBox.classList.remove('hide');
        } else {
          alert('Please provide your full name and shipping address.');
        }
        return;
      }

      const productId = form.querySelector('input[name="productId"]').value;
      const price = form.querySelector('input[name="price"]').value;
      const payment = (document.querySelector('#app input[name="payment"]:checked') || {}).value || 'card';
      const name = (nameInput || {}).value || getCurrentUser().username;
      const address = (addrInput || {}).value || '';

      const order = createOrder({ user: getCurrentUser(), productId, size: productState.size, price, paymentMethod: payment, name, address });
      if (order && order.id) {
        if (errorBox) { errorBox.classList.add('hide'); }
        navigate('order-success', { id: order.id });
      } else {
        if (errorBox) {
          errorBox.textContent = 'Could not place order. Please try again.';
          errorBox.classList.remove('hide');
        } else {
          alert('Could not place order. Please try again.');
        }
      }
    };
  }
}

// Global click handler for navigation links
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-nav]');
  if (!a) return;
  e.preventDefault();
  navigate(a.dataset.nav, { id: a.dataset.id });
  $('#mobile-menu').classList.add('hide');
});

// Mobile menu toggle
$('#burger').onclick = () => $('#mobile-menu').classList.toggle('hide');

// Initialize app
updateAuthUI();
wireSearch();
navigate('home');

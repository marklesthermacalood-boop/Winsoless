// Simple checkout/order storage
function _loadOrders() {
  try {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  } catch (e) {
    return [];
  }
}

function _saveOrders(list) {
  localStorage.setItem('orders', JSON.stringify(list));
}

function createOrder({ user, productId, size, price, paymentMethod, name, address, status }) {
  const orders = _loadOrders();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  const order = {
    id,
    user: user || null,
    productId,
    size: size || null,
    price: Number(price) || 0,
    paymentMethod: paymentMethod || 'card',
    name: name || null,
    address: address || null,
    status: status || 'Pending',
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  _saveOrders(orders);
  return order;
}

function getOrder(id) {
  const orders = _loadOrders();
  return orders.find(o => o.id === id) || null;
}

function getOrdersForUser(email) {
  const orders = _loadOrders();
  if (!email) return orders;
  return orders.filter(o => o.user && o.user.email === email);
}

function _loadBids() {
  try {
    return JSON.parse(localStorage.getItem('bids') || '[]');
  } catch (e) {
    return [];
  }
}

function _saveBids(list) {
  localStorage.setItem('bids', JSON.stringify(list));
}

function createBid({ user, productId, size, amount, note, ask }) {
  const bids = _loadBids();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  const bidAmount = Number(amount) || 0;
  const isWon = ask != null && bidAmount >= Number(ask);
  const bid = {
    id,
    user: user || null,
    productId,
    size: size || null,
    price: bidAmount,
    note: note || null,
    status: isWon ? 'Won' : 'Pending',
    createdAt: new Date().toISOString(),
  };
  bids.unshift(bid);
  _saveBids(bids);

  if (isWon) {
    createOrder({
      user,
      productId,
      size,
      price: bidAmount,
      paymentMethod: 'Bid Win',
      name: user?.username || null,
      address: null,
      status: 'Completed',
    });
  }

  return bid;
}

function getBid(id) {
  const bids = _loadBids();
  return bids.find(b => b.id === id) || null;
}

function getBidsForUser(email) {
  const bids = _loadBids();
  if (!email) return bids;
  return bids.filter(b => b.user && b.user.email === email);
}

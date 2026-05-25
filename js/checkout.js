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

function createOrder({ user, productId, size, price, paymentMethod, name, address }) {
  const orders = _loadOrders();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  const order = {
    id,
    user: user || null,
    productId,
    size: size || null,
    price: Number(price) || 0,
    paymentMethod,
    name: name || null,
    address: address || null,
    status: 'Pending',
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

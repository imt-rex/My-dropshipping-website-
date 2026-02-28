(function () {
  const CART_KEY = 'voltluxe_cart';

  function getCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartUI();
  }

  function addToCart(productId, quantity = 1) {
    const product = (window.VoltLuxeProducts || []).find((item) => item.id === productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: productId, quantity: quantity });
    }
    saveCart(cart);
  }

  function removeFromCart(productId) {
    const next = getCart().filter((item) => item.id !== productId);
    saveCart(next);
  }

  function getCartSummary() {
    const cart = getCart();
    const products = window.VoltLuxeProducts || [];

    let subtotal = 0;
    const items = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;
        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;
        return {
          ...item,
          product,
          lineTotal
        };
      })
      .filter(Boolean);

    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal
    };
  }

  function formatPrice(value) {
    return `$${value.toFixed(2)}`;
  }

  function renderCartUI() {
    const summary = getCartSummary();

    document.querySelectorAll('.cart-count').forEach((node) => {
      node.textContent = String(summary.count);
    });

    const totalEl = document.getElementById('cart-total');
    if (totalEl) {
      totalEl.textContent = formatPrice(summary.subtotal);
    }

    const itemsContainer = document.getElementById('cart-items');
    if (itemsContainer) {
      if (summary.items.length === 0) {
        itemsContainer.innerHTML = `
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>`;
      } else {
        itemsContainer.innerHTML = summary.items
          .map(
            ({ product, quantity, lineTotal }) => `
            <div class="cart-item">
              <img class="cart-item-image" src="${product.image}" alt="${product.name}">
              <div class="cart-item-info">
                <div class="cart-item-title">${product.name}</div>
                <div class="cart-item-price">${formatPrice(lineTotal)} (${quantity}x)</div>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart('${product.id}')" aria-label="Remove item">&times;</button>
            </div>`
          )
          .join('');
      }
    }
  }

  function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  window.getCart = getCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.getCartSummary = getCartSummary;
  window.toggleCart = toggleCart;
  window.formatPrice = formatPrice;

  document.addEventListener('DOMContentLoaded', renderCartUI);
})();

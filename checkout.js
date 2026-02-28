(function () {
  function renderSummary() {
    const summary = window.getCartSummary ? window.getCartSummary() : { items: [], subtotal: 0 };
    const tax = summary.subtotal * 0.08;
    const total = summary.subtotal + tax;

    const summaryItems = document.getElementById('summary-items');
    if (summaryItems) {
      summaryItems.innerHTML = summary.items.length
        ? summary.items
            .map(
              ({ product, quantity, lineTotal }) => `
              <div class="summary-row">
                <span>${product.name} × ${quantity}</span>
                <span>${window.formatPrice(lineTotal)}</span>
              </div>`
            )
            .join('')
        : '<p>Your cart is empty.</p>';
    }

    const subtotal = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');

    if (subtotal) subtotal.textContent = window.formatPrice(summary.subtotal);
    if (taxEl) taxEl.textContent = window.formatPrice(tax);
    if (totalEl) totalEl.textContent = window.formatPrice(total);
  }

  function togglePaymentFields() {
    const cardSection = document.getElementById('card-payment-form');
    if (!cardSection) return;

    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    cardSection.style.display = method === 'card' ? 'block' : 'none';
  }

  function handleCheckout(event) {
    event.preventDefault();

    const summary = window.getCartSummary ? window.getCartSummary() : { count: 0 };
    if (!summary.count) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    alert('Order placed successfully!');
    localStorage.removeItem('voltluxe_cart');
    window.location.href = 'index.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    togglePaymentFields();
    document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
      input.addEventListener('change', togglePaymentFields);
    });
  });

  window.handleCheckout = handleCheckout;
})();

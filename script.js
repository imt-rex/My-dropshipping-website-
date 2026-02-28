(function () {
  function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const current = getComputedStyle(navLinks).display;
    navLinks.style.display = current === 'none' ? 'flex' : 'none';
  }

  function createProductCard(product) {
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">${window.formatPrice(product.price)}</span>
        <div class="product-card-actions">
          <a class="btn btn-secondary" href="product.html?id=${product.id}">View</a>
          <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </article>
    `;
  }

  function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container || !window.VoltLuxeProducts) return;
    const featured = window.VoltLuxeProducts.slice(0, 3);
    container.innerHTML = featured.map(createProductCard).join('');
  }

  function handleNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value.trim()) return;

    alert('Thanks for subscribing to VOLTLUXE updates!');
    form.reset();
  }

  document.addEventListener('DOMContentLoaded', loadFeaturedProducts);

  window.toggleMobileMenu = toggleMobileMenu;
  window.createProductCard = createProductCard;
  window.handleNewsletter = handleNewsletter;
})();

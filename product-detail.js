(function () {
  function renderProductDetail() {
    const container = document.getElementById('product-container');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || (window.VoltLuxeProducts || [])[0]?.id;
    const product = (window.VoltLuxeProducts || []).find((item) => item.id === productId);

    if (!product) {
      container.innerHTML = '<p>Product not found.</p>';
      return;
    }

    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) breadcrumb.textContent = product.name;

    container.innerHTML = `
      <div class="product-image-wrap">
        <img class="product-main-image" src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info-wrap">
        <h1>${product.name}</h1>
        <div class="product-price">${window.formatPrice(product.price)}</div>
        <p>${product.description}</p>
        <ul>
          ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
        </ul>
        <button class="btn btn-primary" onclick="addToCart('${product.id}', 1)">Add to Cart</button>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', renderProductDetail);
})();

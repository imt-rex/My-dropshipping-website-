(function () {
  let filteredProducts = [...(window.VoltLuxeProducts || [])];

  function selectedValue(name, fallback) {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
  }

  function applyFilters() {
    const category = selectedValue('category', 'all');
    const priceRange = selectedValue('price', 'all');

    filteredProducts = (window.VoltLuxeProducts || []).filter((product) => {
      const categoryOk = category === 'all' || product.category === category;
      let priceOk = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        priceOk = product.price >= min && product.price <= max;
      }
      return categoryOk && priceOk;
    });
  }

  function renderShopProducts() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    if (filteredProducts.length === 0) {
      grid.innerHTML = '<p>No products match these filters.</p>';
    } else {
      grid.innerHTML = filteredProducts.map(window.createProductCard).join('');
    }

    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`;
    }
  }

  function filterProducts() {
    applyFilters();
    renderShopProducts();
  }

  function sortProducts(type) {
    const sorters = {
      featured: (a, b) => 0,
      'price-low': (a, b) => a.price - b.price,
      'price-high': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      newest: (a, b) => a.name.localeCompare(b.name)
    };

    filteredProducts.sort(sorters[type] || sorters.featured);
    renderShopProducts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    filterProducts();
  });

  window.filterProducts = filterProducts;
  window.sortProducts = sortProducts;
})();

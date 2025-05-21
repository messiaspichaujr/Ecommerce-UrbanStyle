// Dados dos Produtos
const products = [
  {
    id: 1,
    name: 'Blazer Slim Fit',
    category: 'clothing',
    price: 349.90,
    oldPrice: 399.90,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    rating: 4.5,
    badge: 'Novo'
  },
  {
    id: 2,
    name: 'Tênis Runner Pro',
    category: 'shoes',
    price: 289.90,
    oldPrice: 329.90,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    rating: 4.8,
    badge: 'Mais Vendido'
  },
  {
    id: 3,
    name: 'Relógio Premium',
    category: 'accessories',
    price: 599.90,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    rating: 5,
    badge: 'Edição Limitada'
  },
  {
    id: 4,
    name: 'Camisa Social',
    category: 'clothing',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
    rating: 4.2
  },
  {
    id: 5,
    name: 'Bolsa Executiva',
    category: 'accessories',
    price: 429.90,
    oldPrice: 499.90,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80',
    rating: 4.7,
    badge: 'Promoção'
  },
  {
    id: 6,
    name: 'Sapato Social',
    category: 'shoes',
    price: 279.90,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    rating: 4.3
  },
  {
    id: 7,
    name: 'Jaqueta de Couro',
    category: 'clothing',
    price: 699.90,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    rating: 4.9,
    badge: 'Premium'
  },
  {
    id: 8,
    name: 'Óculos de Sol',
    category: 'accessories',
    price: 249.90,
    oldPrice: 299.90,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    rating: 4.6
  }
];

function renderProducts(filter = 'all') {
  const productsGrid = document.querySelector('.products-grid');
  productsGrid.innerHTML = '';
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);
  
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card slide-up';
    
    let badgeHTML = '';
    if (product.badge) {
      badgeHTML = `<span class="product-badge">${product.badge}</span>`;
    }
    
    let oldPriceHTML = '';
    if (product.oldPrice) {
      oldPriceHTML = `<span class="old-price">R$${product.oldPrice.toFixed(2)}</span>`;
    }
    
    productCard.innerHTML = `
      <div class="product-img-container">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-img">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category">${product.category === 'clothing' ? 'Vestuário' : 
                                      product.category === 'shoes' ? 'Calçados' : 'Acessórios'}</p>
        <div class="product-price">
          <span class="current-price">R$${product.price.toFixed(2)}</span>
          ${oldPriceHTML}
        </div>
        <div class="product-rating">
          ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
          ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
          <span>(${product.rating})</span>
        </div>
        <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    
    productsGrid.appendChild(productCard);
  });
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      addToCart(product);
      
      // Animação do botão
      e.target.innerHTML = '<i class="fas fa-check"></i> Adicionado';
      e.target.style.backgroundColor = 'var(--success)';
      setTimeout(() => {
        e.target.innerHTML = 'Adicionar ao Carrinho';
        e.target.style.backgroundColor = '';
      }, 2000);
    });
  });
}

document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const category = e.target.getAttribute('data-category');
    
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    renderProducts(category);
  });
});

document.querySelector('.search-input').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  if (searchTerm.length > 2) {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.category.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>Nenhum produto encontrado para "${searchTerm}"</p>
        </div>
      `;
    } else {
      filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" class="product-img">
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">R$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
          </div>
        `;
        productsGrid.appendChild(productCard);
      });
    }
  } else if (e.target.value === '') {
    renderProducts();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
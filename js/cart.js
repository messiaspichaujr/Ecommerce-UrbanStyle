let cart = [];

const cartCount = document.querySelector('.cart-count');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');


function updateCart() {
  cartCount.textContent = cart.length;
  
  if (cart.length === 0) {
    emptyCart.style.display = 'flex';
    cartItemsContainer.innerHTML = '';
  } else {
    emptyCart.style.display = 'none';
    renderCartItems();
  }
  
  calculateTotal();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">R$${item.price.toFixed(2)}</p>
      </div>
      <i class="fas fa-times cart-item-remove" data-index="${index}"></i>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `R$${total.toFixed(2)}`;
}

function addToCart(product) {
  cart.push(product);
  updateCart();
  showNotification(`${product.name} adicionado ao carrinho!`);
  
  cartCount.classList.add('bounce');
  setTimeout(() => {
    cartCount.classList.remove('bounce');
  }, 500);
}

function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  updateCart();
  showNotification(`${removedItem.name} removido do carrinho`);
}

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    showNotification('Seu carrinho está vazio!');
    return;
  }
  
  showNotification('Compra finalizada com sucesso! Obrigado!');
  cart = [];
  updateCart();
});

updateCart();